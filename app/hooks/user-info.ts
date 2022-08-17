import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';

export type User = {
  user_id: string;
  created: boolean;
  grad_year: null | number;
  critique_websites: boolean;
  critique_resumes: boolean;
  user_info: UserProfile;
};

export default function useUserInfo(): {
  data: User;
  message: string;
  error: Error;
  isValidating: boolean;
} {
  const { user } = useUser();
  const fetcher = (url: string) => fetch(url).then(async (res) => res.json());

  const { data, error, isValidating } = useSWR(`/api/users/${user?.sub}`, fetcher);

  return { data: data?.data, error, isValidating, message: data?.message };
}
