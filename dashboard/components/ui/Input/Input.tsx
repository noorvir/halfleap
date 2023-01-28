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
    <div className={classes}>
      <input className={classes} value={value} {...rest} />
      {value && (
        <label htmlFor="name">
          {label}
          {error && (
            <Text variant={'caption'} className="inline-block pl-1">
              {error}
            </Text>
          )}
        </label>
      )}
    </div>
  );
}
