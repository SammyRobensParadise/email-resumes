import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';

export default function Api() {
  const { user } = useUser();

  const fetcher = useCallback(
    (url: string) => {
      if (user) {
        fetch(url, { method: 'PUT', body: JSON.stringify(user) })
          .then(async (res) => {
            const response = await res.json();
            toast.info(response.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((error) =>
            toast.error(error.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }),
          );
      }
    },
    [user],
  );

  useEffect(() => {
    fetcher('/api/users/create');
  }, [fetcher]);

  return null;
}
