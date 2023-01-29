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
          className={`text-subheader tracking-subheader font-inter font-semibold ${className}`}
          {...rest}
        >
          {props.children}
        </p>
      );
    case 'caption':
      return (
        <p
          className={`text-caption tracking-caption1 font-inter font-normal ${className}`}
          {...rest}
        >
          {props.children}
        </p>
      );
    case 'footnote':
      return (
        <p
          className={`text-footnote tracking-footnote font-inter font-normal ${className}`}
          {...rest}
        >
          {props.children}
        </p>
      );
    case 'subtitle':
      return (
        <p
          className={`text-subtitle tracking-subtitle font-inter font-normal ${className}`}
          {...rest}
        >
          {props.children}
        </p>
      );
    default:
      // body
      return (
        <p
          className={`text-body tracking-body font-inter font-normal ${className}`}
          {...rest}
        >
          {props.children}
        </p>
      );
  }
}
