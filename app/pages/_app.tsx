import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function EmailResumes({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  );
}

export default EmailResumes;
