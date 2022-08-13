import type { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import Avatar from '../components/avatar';
import Spinner from '../components/spinner';
import useSWR from 'swr';
import Alert from '../components/Alert';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/router';

const Profile: NextPage = () => {
  const { user, isLoading, error } = useUser();
  const currentYear = new Date().getFullYear();
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then(async (res) => res.json());
  const { data, error: err } = useSWR(`/api/users/${user?.sub}`, fetcher);
  const gradutionYear: number | null = data?.data?.grad_year;

  function updateGradutionYear(event: ChangeEvent<HTMLSelectElement>) {
    const year = parseInt(event.target.value);
    if (year === NaN) {
      return;
    }
    fetch(`/api/users/${user?.sub}/${year}`, { method: 'PUT' })
      .then((response) => {
        console.log(response);
        toast.success(`Graduation updated to ${year}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteCurrentUser() {
    /*  fetch(`/api/users/delete/${user?.sub}`, { method: 'DELETE' }).then((response) => {
      console.log(response);
      router.push('/api/auth/logout');
    });*/
    // currently just logs user out
    router.push('/api/auth/logout');
  }

  if (isLoading) {
    return (
      <div className='p-8'>
        <Spinner />
      </div>
    );
  }
  if (error && err) {
    return (
      <div className='p-8'>
        <Alert type='error'>
          Error! Unable to retreive profile information. Please try again or contact the
          administrator. {error.message}
        </Alert>
      </div>
    );
  }
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <div className='flex min-h-full items-center justify-center'>
            <Dialog.Panel className='mx-auto max-w-sm rounded bg-white p-8'>
              <Dialog.Title className='text-gray-700 text-lg font-semibold'>
                Delete Your Account?
              </Dialog.Title>

              <p>
                This action cannot be undone. Deleting you account will cancel any resume critique
                sessions
              </p>
              <div className='flex space-x-4 pt-4'>
                <button
                  onClick={() => setIsOpen(false)}
                  type='button'
                  className='inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                >
                  Cancel
                </button>

                <button
                  onClick={deleteCurrentUser}
                  type='button'
                  className='inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'
                >
                  Delete Anyway
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
      <div className='space-y-8 pb-24'>
        <div className='space-y-4 p-6 shadow-md rounded-lg bg-gray-100 text-gray-700 m-8'>
          <div>
            <p className='text-gray-700 font-semibold'>Profile Info</p>
          </div>
          <div>
            <Avatar size={64} />
          </div>
          <div className='flex flex-row space-x-4'>
            <p className='pb-4 text-gray-700'>Name</p>
            <p className='text-gray-500'>{user?.name}</p>
          </div>
          <div className='flex flex-row space-x-4'>
            <p className='pb-4 text-gray-700'>Email:</p>
            <p className='text-gray-500'>{user?.email}</p>
            {user?.email_verified ? (
              <span className='mt-1 text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded h-5'>
                Verified
              </span>
            ) : (
              <span className='mt-1 text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded h-5'>
                Not Verified
              </span>
            )}
          </div>
          <div className='flex flex-row space-x-4'>
            <p className='pb-4 text-gray-700 '>Last Updated</p>
            <p className='text-gray-500'>{new Date(user?.updated_at ?? '').toLocaleDateString()}</p>
          </div>
        </div>
        <div className='space-y-4 p-6 shadow-md rounded-lg bg-gray-100 text-gray-700 m-8'>
          <div>
            <p className='text-gray-700 font-semibold'>Settings</p>
            <div className='flex py-2 space-x-4'>
              <p className='leading-8'>Graduation Year</p>
              <div className='mb-3 xl:w-96'>
                <select
                  className='form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  aria-label='Gradution Year'
                  onChange={updateGradutionYear}
                  defaultValue={gradutionYear?.toString()}
                >
                  <option value={`${null}`}>Select Graduation Year</option>
                  <option value={`${currentYear}`}>{currentYear}</option>
                  <option value={`${currentYear + 1}`}>{currentYear + 1}</option>
                  <option value={`${currentYear + 2}`}>{currentYear + 2}</option>
                  <option value={`${currentYear + 3}`}>{currentYear + 3}</option>
                  <option value={`${currentYear + 4}`}>{currentYear + 4}</option>
                  <option value={`${currentYear + 5}`}>{currentYear + 5}</option>
                  <option value={`${currentYear + 6}`}>{currentYear + 6}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='space-y-4 p-6 shadow-md rounded-lg bg-white text-gray-700 m-8 border border-red-600'>
          <div>
            <p className='text-red-600 font-semibold'>Danger Zone</p>
          </div>
          <div>
            <button
              type='button'
              className='inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
              onClick={() => setIsOpen(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
