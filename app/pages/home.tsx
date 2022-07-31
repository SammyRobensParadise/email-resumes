import type { NextPage } from 'next';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

const Home: NextPage = () => {
  const { user } = useUser();

  return <div className='p-8'></div>;
};

export default Home;
