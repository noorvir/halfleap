import Link from 'next/link';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface BaseButtonProps {
  href?: string;
  autofocus?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

export interface StyledButtonProps {
  type?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'cancel';
  variant?: 'action' | 'large';
  icon?: IconType;
  children?: ReactNode;
  loading?: boolean;
  [key: string]: unknown;
}

export type ButtonAsButton = StyledButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonAsLink = StyledButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const getVariant = (variant: string) => {
  switch (variant) {
    case 'large': {
      return 'min-w-fit  w-full px-4 py-4 min-h-15 text-title tracking-title leading-title';
    }
    default: {
      // action
      return 'px-3 py-1.5 min-w-fit h-fit w-min  text-subtitle tracking-subtitle leading-subtitle';
    }
  }
};

const BaseButton = ({ href, children, autofocus, ...rest }: BaseButtonProps) => {
  if (href && href.startsWith('/')) {
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button {...rest} autoFocus={autofocus}>
      {children}
    </button>
  );
};

export default BaseButton;
