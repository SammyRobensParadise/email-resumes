import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function useUserManager(): {
  user: UserProfile | undefined;
  isLoading: boolean;
  error: Error | undefined;
  deleteCurrentUser: () => void;
} {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  function deleteCurrentUser() {
    fetch(`/api/users/delete/${user?.sub}`, { method: 'DELETE' }).then(() => {
      toast.success(`Account deleted successfully`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push('/api/auth/logout');
    });
  }

  return { user, isLoading, error, deleteCurrentUser };
}
