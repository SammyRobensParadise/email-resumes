import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { toast } from 'react-toastify';

export default function useCritiqueResumes(): {
  critiqueResumes: number;
  error: any;
  updateCritiqueResumes: (status: boolean, callback?: () => void) => void;
} {
  const { user } = useUser();
  const fetcher = (url: string) => fetch(url).then(async (res) => res.json());

  const { data, error } = useSWR(`/api/users/${user?.sub}`, fetcher);

  function updateCritiqueResumes(status: boolean, callback?: () => void) {
    fetch(`/api/users/${user?.sub}/resumes/${status}`, { method: 'PUT' })
      .then(() => {
        toast.success(`Resume critique updated to ${status}.`, {
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
        toast.error(`Unable to update resume critique to ${status}.`, {
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
  return { critiqueResumes: data?.data?.critique_resumes, error, updateCritiqueResumes };
}
