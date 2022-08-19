import { useUser } from '@auth0/nextjs-auth0';

export default function useCritiqueManager() {
  const { user } = useUser();

  function createCritique() {
    if (user?.sub) {
      fetch('/api/critique/create', { method: 'POST', body: JSON.stringify(user) })
        .then((response) => {})
        .catch((error) => {});
    }
  }
  return { createCritique };
}
