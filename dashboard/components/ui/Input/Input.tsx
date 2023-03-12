import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
  label?: string | undefined;
}

export default function Input({
  type = 'text',
  name,
  label,
  error,
  className,
  ...rest
}: InputProps) {
  return (
    <div>
      <label
        htmlFor="email"
        className={`text-sm text-gray-900 flex justify-between font-medium leading-6 ${className}`}
      >
        <span>{label}</span>
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          className={`text-red-900 sm:text-sm sm:leading-6 block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-light-blue1 ${
            error && 'ring-red placeholder:text-red focus:ring-red'
          }`}
          {...rest}
        />
      </div>
      <p className={`mt-0.5 ml-0.5 block text-caption text-red ${error ? 'visible' : 'invisible'}`}>
        {error || '-'}
      </p>
    </div>
  );
}
