import React from 'react';

import BaseButton, {
  ButtonAsButton,
  ButtonAsLink,
  getVariant,
} from 'components/ui/Button/Button.utils';

type ButtonProps = ButtonAsButton | ButtonAsLink;

const getType = (type: string) => {
  switch (type) {
    case 'secondary': {
      return ``;
    }
    case 'tertiary': {
      return ``;
    }
    case 'destructive': {
      return ``;
    }
    case 'cancel': {
      return ``;
    }
    default: {
      // primary
      return `bg-system-grey2`;
    }
  }
};

export const Button = ({
  type = 'primary',
  variant = 'action',
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  const { icon, autofocus, ...rest } = props;
  // Double negation is needed to prevent Type 'unknown' is not assignable to boolean type error
  const autoFocus = !!autofocus;

  const iconBase = `inline ${variant === 'large' ? 'h-5 w-5' : 'h-3.33 w-3.33 '} mr-2.33`;

  const Icon = icon;

  return (
    <BaseButton
      autofocus={autoFocus}
      className={`font-inter rounded-default inline-flex min-w-fit min-w-fit items-center justify-center whitespace-nowrap rounded-lg transition-colors ${getVariant(
        variant
      )} ${getType(type)}`}
      disabled={disabled}
      {...rest}
    >
      <span className={`flex items-center ${loading ? 'invisible' : 'block'}`}>
        {Icon && <Icon className={iconBase} />}
        {props.children}
      </span>
      {loading ? (
        <span
          style={{ borderTopColor: 'transparent' }}
          className={'absolute h-4 w-4 animate-spin rounded-full border-2 border-solid'}
        />
      ) : (
        ''
      )}
    </BaseButton>
  );
};
