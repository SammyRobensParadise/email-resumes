import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';

export default function Avatar({ size = 24 }: { size?: number }) {
  const { user } = useUser();

  if (user?.picture) {
    return (
      <Image
        src={user.picture}
        className='rounded-full w-32'
        alt='Avatar'
        height={`${size}`}
        width={`${size}`}
      />
    );
  }

  return null;
}
