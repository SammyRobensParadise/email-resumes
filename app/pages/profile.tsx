import type { NextPage } from 'next';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import Avatar from '../components/avatar';
import Spinner from '../components/spinner';

const Profile: NextPage = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className='p-8'>
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className='p-8'>
        <div
          className='bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full'
          role='alert'
        >
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='times-circle'
            className='w-4 h-4 mr-2 fill-current'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'
            ></path>
          </svg>
          Error! Unable to retreive profile information. Please try again or contact the
          administrator. {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className='p-8 space-y-4'>
      <div>
        <p className='pb-4 text-gray-700'>Profile Photo</p>
        <Avatar size={64} />
      </div>
      <div className='flex flex-row space-x-4'>
        <p className='pb-4 text-gray-700'>Name</p>
        <p>{user?.name}</p>
      </div>
      <div className='flex flex-row space-x-4'>
        <p className='pb-4 text-gray-700'>Email</p>
        <p>{user?.email}</p>
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
        <p className='pb-4 text-gray-700'>Last Updated</p>
        <p>{new Date(user?.updated_at ?? '').toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Profile;