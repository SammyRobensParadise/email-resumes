import { useEffect } from 'react';
import useUserManager from '../hooks/user-manager';

export default function Api() {
  const { createUser } = useUserManager();

  useEffect(() => {
    createUser();
  }, [createUser]);

  return null;
}
