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
      return ``;
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
  const { className, icon, autofocus, ...rest } = props;
  // Double negation is needed to prevent Type 'unknown' is not assignable to boolean type error
  const autoFocus = !!autofocus;

  const iconBase = `inline ${variant === 'large' ? 'h-5 w-5' : 'h-3.33 w-3.33 '} mr-2.33`;
  const base = `inline-flex items-center font-inter justify-center rounded-default min-w-fit whitespace-nowrap min-w-fit transition-colors`;

  const classes = `${base} ${className} ${getVariant(variant)} ${getType(type)}`;
  const Icon = icon;

  return (
    <BaseButton autofocus={autoFocus} className={classes} disabled={disabled} {...rest}>
      <span className={`flex items-center ${loading ? 'invisible' : 'block'}`}>
        {Icon && <Icon className={iconBase} />}
        {props.children}
      </span>
      {loading ? (
        <span
          style={{ borderTopColor: 'transparent' }}
          className={'absolute border-solid rounded-full animate-spin w-4 h-4 border-2'}
        />
      ) : (
        ''
      )}
    </BaseButton>
  );
};
