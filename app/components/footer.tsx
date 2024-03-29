import Link from 'next/link';

export default function Footer() {
  return (
    <footer className=' bottom-0 fixed min-w-full flex font-semibold px-4 py-2 bg-slate-200 text-gray-900 place-content-between'>
      <div>
        <button
          type='button'
          className='inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'
        >
          <Link href='/policy'>
            <h2>Policy</h2>
          </Link>
        </button>
      </div>
      <div className='flex space-x-2'>
        <a
          type='link'
          className='cursor-pointer inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'
          href='mailto:srobensp@uwaterloo.ca?Subject=Email-Resumes%20Help'
        >
          Help
        </a>
      </div>
    </footer>
  );
}
