import React from 'react';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  stretch?: boolean;
}

export default function Button({ size = 'md', stretch = false, children, ...rest }: Props) {
  return (
    <button
      className={`${size === 'sm' ? 'text-subtitle' : 'text-body'} ${stretch ? 'w-full' : ''}
       rounded-lg bg-system-grey2 px-4 py-2`}
      {...rest}
    >
      {children}
    </button>
  );
}
