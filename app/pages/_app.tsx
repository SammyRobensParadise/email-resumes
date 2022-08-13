import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Api from '../components/api';
import { ToastContainer } from 'react-toastify';

function EmailResumes({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ToastContainer />
      <Api />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  );
}

export default EmailResumes;
