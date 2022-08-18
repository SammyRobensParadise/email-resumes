import type { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import useUserInfo from '../hooks/user-info';
import Unauthorized from '../components/Unauthorized';

const New: NextPage = () => {
  const { user } = useUser();

  // const { data } = useUserInfo();

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
        <h3 className='text-3xl font-bold mb-8'>New Critique</h3>
        <form>
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
            type='button'
            className='px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default New;
