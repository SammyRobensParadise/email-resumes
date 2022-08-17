import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { toast } from 'react-toastify';

export default function useCritiqueWebsites(): {
  critiqueWebsites: number;
  error: any;
  updateCritiqueWebsites: (status: boolean, callback?: () => void) => void;
} {
  const { user } = useUser();
  const fetcher = (url: string) => fetch(url).then(async (res) => res.json());

  const { data, error } = useSWR(`/api/users/${user?.sub}`, fetcher);

  function updateCritiqueWebsites(status: boolean, callback?: () => void) {
    fetch(`/api/users/${user?.sub}/websites/${status}`, { method: 'PUT' })
      .then(() => {
        toast.success(`Website critique updated to ${status}.`, {
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
        toast.error(`Unable to update website critique to ${status}.`, {
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
  return { critiqueWebsites: data?.data?.critique_Websites, error, updateCritiqueWebsites };
}
