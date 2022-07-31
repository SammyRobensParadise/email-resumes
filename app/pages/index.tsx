import type { NextPage } from 'next';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import Spinner from '../components/spinner';

const Main: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className='p-8'>
        <Spinner />
      </div>
    );
  }
  if (error)
    return (
      <div className='space-y-4'>
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
          {error.message}
        </div>
        <p className='text-base font-light leading-relaxed mt-0 mb-4 text-gray-800'>
          {error.stack}
        </p>
      </div>
    );

  if (user) {
    return (
      <div>
        Welcome {user.name}! <Link href='/api/auth/logout'>Logout</Link>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <div className='flex space-x-2 justify-center flex-col text-center'>
        <div className='w-1/4 self-center'>
          <h1 className='text-5xl font-bold mt-0 mb-6'>Resume Critique Pairing</h1>
          <h3 className='text-3xl font-bold mb-8'>
            Systems Design Engineering {new Date().getFullYear().toString()}
          </h3>
          <button
            type='button'
            data-mdb-ripple='true'
            data-mdb-ripple-color='light'
            className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          >
            <Link href='/api/auth/login'>Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
