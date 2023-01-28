import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'title';
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Heading(props: HeadingProps) {
  const { className, variant, ...rest } = props;
  switch (variant) {
    case 'h2':
      return (
        <h2
          className={`text-h2 font-semibold tracking-h2 font-manrope ${className}`}
          {...rest}
        >
          {props.children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className={`text-h3 font-normal tracking-h3 font-manrope ${className}`}
          {...rest}
        >
          {props.children}
        </h3>
      );
    case 'h4':
      return (
        <h4
          className={`text-h4 font-regular tracking-h4 font-manrope ${className}`}
          {...rest}
        >
          {props.children}
        </h4>
      );
    case 'h5':
      return (
        <h4
          className={`text-h5 font-medium tracking-h5 font-manrope ${className}`}
          {...rest}
        >
          {props.children}
        </h4>
      );
    case 'title':
      return (
        <h5
          className={`text-title font-normal tracking-title font-inter ${className}`}
          {...rest}
        >
          {props.children}
        </h5>
      );
    default:
      // h1
      return (
        <h1 className={`text-h1 font-semibold font-manrope ${className}`} {...rest}>
          {props.children}
        </h1>
      );
  }
}
