import React, { ComponentProps, ElementType, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv, VariantProps } from 'tailwind-variants';

const buttonStyle = tv({
  base: 'relative text-white bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700 disabled:bg-zinc-100 disabled:text-zinc-400 inline-flex items-center justify-center gap-2 rounded transition duration-200 whitespace-nowrap disabled:cursor-not-allowed disabled:not(data-[processing=true]):opacity-50',
  variants: {
    color: {
      default: 'text-white bg-slate-500',
      primary: 'text-white bg-primary-500',
      secondary: 'text-white bg-secondary-600/90',
      success: 'text-white bg-emerald-600',
      danger:
        'text-white bg-red-600 hover:bg-red-800 active:bg-red-900 disabled:bg-red-100 disabled:text-red-400',
      white: 'text-primary-600 bg-white',
    },
    variant: {
      solid: '',
      outline: 'border bg-transparent',
    },
    size: {
      xs: 'h-6 text-xs font-medium px-3',
      sm: 'h-8 text-sm font-medium px-3',
      md: 'h-10 text-sm font-medium px-4',
      lg: 'h-12 text-base font-medium px-6',
    },
    fullWidth: {
      false: 'inline-flex',
      true: 'flex w-full',
    },
  },
  compoundVariants: [
    /* default variants */
    {
      color: 'default',
      variant: 'solid',
      className:
        'text-white bg-slate-500 hover:bg-slate-600 active:bg-slate-700 disabled:bg-slate-100 disabled:text-slate-400',
    },
    {
      color: 'default',
      variant: 'outline',
      className:
        'hover:bg-slate-200 active:bg-slate-300 border-slate-500 hover:border-slate-700 text-slate-500 hover:text-slate-700 disabled:text-slate-600/40 disabled:border-slate-600/20',
    },

    /* primary variants */

    {
      color: 'primary',
      variant: 'solid',
      className:
        'hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-100 disabled:text-primary-400',
    },
    {
      color: 'primary',
      variant: 'outline',
      className:
        'hover:bg-primary-200 active:bg-primary-300 border-primary-500 hover:border-primary-700 text-primary-500 hover:text-primary-700 disabled:text-primary-600/40 disabled:border-primary-600/20',
    },

    /* secondary variants */

    {
      color: 'secondary',
      variant: 'solid',
      className:
        'hover:bg-secondary-600 active:bg-secondary-700 disabled:bg-secondary-100 disabled:text-secondary-400',
    },
    {
      color: 'secondary',
      variant: 'outline',
      className:
        'hover:bg-secondary-200 active:bg-secondary-300 border-secondary-500 hover:border-secondary-700 text-secondary-500 hover:text-secondary-700 disabled:text-secondary-600/40 disabled:border-secondary-600/20',
    },

    /* success variants */

    {
      color: 'success',
      variant: 'solid',
      className:
        'hover:bg-emerald-700 active:bg-emerald-900 disabled:bg-emerald-200 disabled:text-emerald-400',
    },
    {
      color: 'success',
      variant: 'outline',
      className:
        'hover:bg-emerald-200 active:bg-emerald-300 border-emerald-500 hover:border-emerald-700 text-emerald-500 hover:text-emerald-700 disabled:text-emerald-600/40 disabled:border-emerald-600/20',
    },

    /* white */

    {
      color: 'white',
      variant: 'solid',
      className:
        'hover:bg-primary-100 active:bg-primary-400 active:text-white disabled:bg-white disabled:text-primary-600/40',
    },
    {
      color: 'white',
      variant: 'outline',
      className:
        'border-white text-white hover:bg-white hover:text-primary-600 active:bg-white/80 active:text-primaru-600 disabled:bg-transparent disabled:border-white/50 disabled:text-white/50',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'md',
    fullWidth: false,
  },
});

const buttonLoading = tv({
  base: 'absolute top-0 left-0 w-full h-full bg-zinc-700 rounded-md flex items-center justify-center',
  variants: {
    color: {
      default: 'bg-slate-500',
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      success: 'bg-emerald-600',
      danger: 'bg-red-500',
      white: 'bg-slate-500',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

const buttonSpin = tv({
  base: 'rounded-full w-[22px] h-[22px] border-[2px] border-zinc-600 border-b-transparent border-zinc-200 animate-spin',
  variants: {
    color: {
      default: 'border-slate-200 border-b-transparent',
      primary: 'border-primary-200 border-b-transparent',
      secondary: 'border-secondary-200 border-b-transparent',
      success: 'border-emerald-200 border-b-transparent',
      danger: 'border-red-200 border-b-transparent',
      white: 'border-slate-200 border-b-transparent',
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: 'w-[28px] h-[28px]',
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
  },
});

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonStyle> & {
    icon?: ElementType;
    iconSize?: number;
    iconSide?: 'left' | 'right';
    isLoading?: boolean;
    loadingText?: string;
  };

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    type = 'button',
    color,
    variant,
    size,
    fullWidth = false,
    icon: Icon,
    iconSize,
    iconSide = 'left',
    isLoading,
    loadingText,
    disabled,
    children,
    className,
    ...rest
  },
  ref,
) => {
  const classIconSide = iconSide === 'right' ? 'flex-row-reverse' : '';
  return (
    <button
      ref={ref}
      type={type}
      data-processing={isLoading}
      disabled={isLoading || disabled}
      className={twMerge([
        buttonStyle({ size, color, variant, fullWidth, className }),
        classIconSide,
      ])}
      {...rest}
    >
      {isLoading && (
        <span className={buttonLoading({ color })}>
          <span className={buttonSpin({ size, color })} />
        </span>
      )}
      {Icon && (
        <Icon
          size={
            iconSize ||
            (size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 18 : 16)
          }
        />
      )}
      {children}
    </button>
  );
};

export default forwardRef(Button);
