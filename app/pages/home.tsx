import type { NextPage } from 'next';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import Alert from '../components/Alert';
import useUserInfo from '../hooks/user-info';
import Unauthorized from '../components/Unauthorized';

const Home: NextPage = () => {
  const [currentTab, setTab] = useState<'CRITIQUES' | 'COACHINGS'>('CRITIQUES');
  const { user } = useUser();

  const { data } = useUserInfo();

  if (!user) {
    return (
      <div className='p-8 space-y-4'>
        <Unauthorized />
      </div>
    );
  }

  return (
    <div className='p-8 space-y-4'>
      {!user?.email_verified && (
        <Alert type='warning'>Psst! We sent you an email to confirm it is really you!</Alert>
      )}
      {!data?.grad_year && (
        <Alert type='warning'>
          <Link href='/profile' passHref>
            <a className='underline'>Add your graduation year to begin singing up</a>
          </Link>
        </Alert>
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
          <div className='tab-pane fade show active'>
            <p>Critiques where you will receive feedback on your resume</p>
          </div>
        )}
        {currentTab === 'COACHINGS' && (
          <div className='tab-pane fade'>
            Critiques where you are providing feedback and coaching others
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
