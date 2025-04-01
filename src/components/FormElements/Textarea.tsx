import React, { ElementType, TextareaHTMLAttributes, forwardRef } from 'react';
import { InputContainer } from './InputContainer';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  id: string;
  name?: string;
  label?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  icon?: ElementType;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSuccess?: boolean;
  defaultValue?: string;
}

const Textarea: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = (
  {
    id,
    name,
    uppercase = false,
    lowercase = false,
    readOnly,
    disabled = false,
    error,
    placeholder,
    icon: Icon,
    size = 'md',
    required,
    className,
    rows = 3,
    ...rest
  },
  ref,
) => {
  return (
    <InputContainer
      required={required}
      error={error}
      disabled={disabled}
      size={size}
      className={twMerge('h-auto py-2', className)}
    >
      {Icon && (
        <Icon
          size={size === 'xs' ? 16 : size === 'lg' ? 24 : 16}
          weight="regular"
          data-error={!!error}
          className="text-slate-500 data-[error=true]:text-red-500"
        />
      )}
      <textarea
        ref={ref}
        data-uppercase={uppercase}
        data-lowercase={lowercase}
        data-disabled={disabled}
        data-readonly={readOnly}
        data-size={size}
        className="w-full outline-none bg-transparent text-slate-600 dark:text-slate-200 text-sm data-[size=xs]:text-xs data-[size=sm]:text-xs data-[size=lg]:text-lg font-medium placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed data-[uppercase=true]:uppercase data-[lowercase=true]:lowercase caret-blue-400"
        id={id}
        name={name || id}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        required={required}
        rows={rows}
        {...rest}
      />
    </InputContainer>
  );
};

export default forwardRef(Textarea);
