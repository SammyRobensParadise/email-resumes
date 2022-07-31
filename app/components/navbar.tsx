import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function Navbar() {
  const { user, error } = useUser();

  return (
    <div className='flex font-semibold px-4 py-2 border-b-2 text-gray-900 place-content-between'>
      <div>
        <button
          type='button'
          className='inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'
        >
          <Link href='/'>
            <h2>Email-Resumes</h2>
          </Link>
        </button>
      </div>
      <div className=''>
        <button
          type='button'
          className='inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'
        >
          {user && !error ? (
            <Link href='/api/auth/logout'>
              <h2>Logout</h2>
            </Link>
          ) : (
            <Link href='/api/auth/login'>
              <h2>Login</h2>
            </Link>
          )}
        </button>
      </div>
    </div>
  );
}