import type { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import useUserInfo from '../hooks/user-info';
import Unauthorized from '../components/Unauthorized';
import { ChangeEvent, useState } from 'react';

const New: NextPage = () => {
  const { user } = useUser();

  const [withResume, setWithResume] = useState<boolean>(false);
  const [withWebsite, setWithWebsite] = useState<boolean>(false);

  // const { data } = useUserInfo();

  function updateWithResume(event: ChangeEvent<HTMLInputElement>) {
    const status = event.target.checked;
    setWithResume(status);
  }

  function updateWithWebsite(event: ChangeEvent<HTMLInputElement>) {
    const status = event.target.checked;
    setWithWebsite(status);
  }

  if (!user) {
    return (
      <div className='p-8 space-y-4'>
        <Unauthorized />
      </div>
    );
  }

  return (
    <div className='p-8 space-y-4'>
      <div className='block p-6 rounded-lg shadow-lg bg-white'>
        <h3 className='text-3xl font-bold'>New Critique</h3>
        <form>
          <div className='py-2'>
            <p className='font-medium py-2'>What would you like critiqued?</p>
            <div className='flex space-x-2'>
              <input
                onChange={updateWithResume}
                id='critique-resumes'
                type='checkbox'
                className='mt-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-100 focus:ring-blue-500  focus:ring-1'
              />
              <label htmlFor='critique-resumes' className='text-gray-700 leading-8'>
                Resume Critique
              </label>
            </div>
            <div className='flex space-x-2'>
              <input
                id='critique-websites'
                onChange={updateWithWebsite}
                type='checkbox'
                className='mt-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-100 focus:ring-blue-500  focus:ring-1'
              />
              <label htmlFor='critique-websites' className='text-gray-700 leading-8'>
                Portfolio or Website Critique
              </label>
            </div>
          </div>
          {withResume && (
            <div className='flex'>
              <div className='mb-3 w-96'>
                <label htmlFor='formFile' className='form-label inline-block mb-2 text-gray-700'>
                  Add your resume
                </label>
                <input
                  className='form-control block w-full  text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  type='file'
                  id='resume'
                  accept='image/*,.pdf'
                />
              </div>
            </div>
          )}
          {withWebsite && (
            <div className='flex'>
              <div className='mb-3 xl:w-96'>
                <label htmlFor='website-url' className='form-label inline-block mb-2 text-gray-700'>
                  Portfolio Link
                </label>
                <input
                  type='text'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='website-url'
                  placeholder='https://your.website.com'
                />
              </div>
            </div>
          )}
          <div className='mb-3 xl:w-96'>
            <label
              htmlFor='critique-description'
              className='form-label inline-block mb-2 text-gray-700'
            >
              Description
            </label>
            <textarea
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      '
              id='critique-description'
              rows={1}
              placeholder='Describe your needs'
            ></textarea>
          </div>
          <button
            type='submit'
            className='px-6 py-2.5 mt-4 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default New;
