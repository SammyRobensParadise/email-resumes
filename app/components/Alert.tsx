import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export default function Alert({
  type,
  children,
}: PropsWithChildren<{ type: 'warning' | 'error' }>) {
  return (
    <div
      className={clsx(
        {
          'bg-yellow-100 text-yellow-700': type === 'warning',
          'bg-red-100 text-red-700': type === 'error',
        },
        'bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base inline-flex items-center w-full',
      )}
      role='alert'
    >
      {type === 'warning' && (
        <svg
          aria-hidden='true'
          focusable='false'
          data-prefix='fas'
          data-icon='exclamation-triangle'
          className='w-4 h-4 mr-2 fill-current'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 576 512'
        >
          <path
            fill='currentColor'
            d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'
          ></path>
        </svg>
      )}
      {type === 'error' && (
        <svg
          aria-hidden='true'
          focusable='false'
          data-prefix='fas'
          data-icon='times-circle'
          className='w-4 h-4 mr-2 fill-current'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
        >
          <path
            fill='currentColor'
            d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'
          ></path>
        </svg>
      )}
      {children}
    </div>
  );
}
