import React from 'react';

import Text from '../Typography/Text';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
  variant: 'large' | 'small';
  disabled?: boolean;
  label?: string | undefined;
}

export default function Input(props: InputProps) {
  const { variant, error, value, label, className, ...rest } = props;
  const base = `flex flex-col-reverse items-start justify-center max-w-full rounded-xl px-3 font-inter`;
  const extra = `${variant === 'large' ? ' h-17' : 'h-11.5'}`;
  const classes = `${base} ${extra}`;

  return (
    <div className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
      <label htmlFor="name" className="block text-xs font-medium text-gray-900">
        {label}
      </label>
      <input
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        {...rest}
      />
    </div>
    // <div className={classes}>
    //   <input className={classes} value={value} {...rest} />
    //   {value && (
    //     <label htmlFor="name">
    //       {label}
    //       {error && (
    //         <Text variant={'caption'} className="inline-block pl-1">
    //           {error}
    //         </Text>
    //       )}
    //     </label>
    //   )}
    // </div>
  );
}
