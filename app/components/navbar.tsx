import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Avatar from './avatar';

export default function Navbar() {
  const { user, error } = useUser();
  return (
    <div className='sticky top-0 bg-white flex font-semibold px-4 py-2 border-b-2 text-gray-900 place-content-between'>
      <div>
        <button
          type='button'
          className='inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'
        >
          <Link href='/home' passHref>
            <a>
              <h2>Email-Resumes</h2>
            </a>
          </Link>
        </button>
      </div>
      <div className='flex space-x-2'>
        {user && !error && (
          <button
            type='button'
            className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          >
            New
          </button>
        )}
        <button
          type='button'
          className='inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'
        >
          {user && !error ? (
            <Link href='/api/auth/logout' passHref>
              <a>
                <h2>Logout</h2>
              </a>
            </Link>
          ) : (
            <Link href='/api/auth/login' passHref>
              <a>
                <h2>Login</h2>
              </a>
            </Link>
          )}
        </button>
        <div className='translate-y-1'>
          <Link href='/profile' passHref>
            <a>
              <Avatar />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
