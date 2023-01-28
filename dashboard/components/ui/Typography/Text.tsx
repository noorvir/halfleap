import React, { FC } from 'react';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant: 'body' | 'subtitle' | 'caption' | 'footnote' | 'subheader';
  children?: React.ReactNode;
  className?: string;
}

export default function Text(props: TextProps) {
  const { className, variant, ...rest } = props;

  switch (variant) {
    case 'subheader':
      return (
        <p
          className={`text-subheader font-semibold tracking-subheader font-inter ${className}`}
          {...rest}
        >
          {props.children}
        </p>
      );
    case 'caption':
      return (
        <p
          className={`text-caption font-normal tracking-caption1 font-inter ${className}`}
          {...rest}
        >
          {props.children}
        </p>
      );
    case 'footnote':
      return (
        <p
          className={`text-footnote font-normal tracking-footnote font-inter ${className}`}
          {...rest}
        >
          {props.children}
        </p>
      );
    case 'subtitle':
      return (
        <p
          className={`text-subtitle font-normal tracking-subtitle font-inter ${className}`}
          {...rest}
        >
          {props.children}
        </p>
      );
    default:
      // body
      return (
        <p
          className={`text-body font-normal tracking-body font-inter ${className}`}
          {...rest}
        >
          {props.children}
        </p>
      );
  }
}
