import type { NextPage } from 'next';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import Avatar from '../components/avatar';
import Spinner from '../components/spinner';
import useSWR from 'swr';
import Alert from '../components/Alert';

const Profile: NextPage = () => {
  const { user, isLoading, error } = useUser();

  const fetcher = (url: string) => fetch(url).then(async (res) => res.json());

  const { data, error: err } = useSWR(`/api/users/${user?.sub}`, fetcher);

  console.log(data);

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
    <div className='space-y-8'>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
