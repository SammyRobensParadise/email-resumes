import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { toast } from 'react-toastify';

export default function useGradYear(): {
  gradYear: number;
  error: any;
  updateGradYear: (year: number, callback?: () => void) => void;
} {
  const { user } = useUser();
  const fetcher = (url: string) => fetch(url).then(async (res) => res.json());

  const { data, error } = useSWR(`/api/users/${user?.sub}`, fetcher);

  function updateGradYear(year: number, callback?: () => void) {
    fetch(`/api/users/${user?.sub}/${year}`, { method: 'PUT' })
      .then(() => {
        toast.success(`Graduation updated to ${year}.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (callback) callback();
      })
      .catch(() => {
        toast.error(`Unable to update graduation year to ${year}.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }
  return { gradYear: data?.data?.grad_year, error, updateGradYear };
}
