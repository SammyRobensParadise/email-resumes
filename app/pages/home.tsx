import type { NextPage } from 'next';
import Link from 'next/link';
import { getAccessToken, useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';

const Home: NextPage = () => {
  const [currentTab, setTab] = useState<'CRITIQUES' | 'COACHINGS'>('CRITIQUES');
  const { user } = useUser();

  return (
    <div className='p-8 space-y-4'>
      {!user?.email_verified && (
        <div
          className='bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full'
          role='alert'
        >
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='exclamation-triangle'
            className='w-4 h-4 mr-2 fill-current'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 576 512'
          >
            <path
              fill='currentColor'
              d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'
            ></path>
          </svg>
          Psst! We sent you an email to confirm it is really you!
        </div>
      )}
      <h3 className='text-3xl font-bold mb-8'>Hi {user?.name}! 👋</h3>
      <p className='text-base font-light leading-relaxed mt-0 mb-4 text-gray-800'>
        This is Systems Design Engineerings resume critique pairing service. Here you can find
        information about critiques that you have signed up for.
      </p>
      <h3 className=' text-lg font-bold mb-8'>My Resume Critiques</h3>
      <ul
        className='nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4'
        id='tabs-tab3'
        role='tablist'
      >
        <li className='nav-item' role='presentation'>
          <button
            onClick={() => setTab('CRITIQUES')}
            className={`nav-link w-ful block font-medium text-xs leading-tight  uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:bg-gray-100 active ${
              currentTab === 'CRITIQUES' ? 'border-blue-600' : ''
            }`}
          >
            Critiques
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            onClick={() => setTab('COACHINGS')}
            className={`nav-link w-ful block font-medium text-xs leading-tight  uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:bg-gray-100 active ${
              currentTab === 'COACHINGS' ? 'border-blue-600' : ''
            }`}
          >
            Coachings
          </button>
        </li>
      </ul>
      <div className='tab-content'>
        {currentTab === 'CRITIQUES' && (
          <div className='tab-pane fade show active'>Tab 1 content button version</div>
        )}
        {currentTab === 'COACHINGS' && (
          <div className='tab-pane fade'>Tab 2 content button version</div>
        )}
      </div>
    </div>
  );
};

export default Home;
