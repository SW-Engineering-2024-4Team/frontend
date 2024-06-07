import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const fetchSocket = async () => {
      await fetch('/api/socket');
    };
    fetchSocket();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
