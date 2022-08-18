import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { toast } from 'react-toastify';

export default function useCritiqueCount(): {
  critiqueCount: number;
  error: any;
  updateCritiqueCount: (count: number, callback?: () => void) => void;
} {
  const { user } = useUser();
  const fetcher = (url: string) => fetch(url).then(async (res) => res.json());

  const { data, error } = useSWR(`/api/users/${user?.sub}`, fetcher);

  function updateCritiqueCount(count: number, callback?: () => void) {
    fetch(`/api/users/${user?.sub}/critiques/${count}`, { method: 'PUT' })
      .then(() => {
        toast.success(`Max critique sessions set to ${count}.`, {
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
        toast.error(`Unable to set Max critique sessions to ${count}.`, {
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
  return {
    critiqueCount: parseInt(data?.data?.critique_count_per_term),
    error,
    updateCritiqueCount,
  };
}
