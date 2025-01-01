'use client';
import React, { ChangeEvent, ElementType, forwardRef } from 'react';
import { IMaskInput, IMaskInputProps } from 'react-imask';
import { InputContainer } from './InputContainer';

export interface InputProps
  extends Omit<IMaskInputProps<HTMLInputElement>, 'size'> {
  id: string;
  name?: string;
  label?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  icon?: ElementType;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const InputTelefone: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  {
    id,
    name,
    type = 'text',
    uppercase = false,
    lowercase = false,
    readOnly,
    disabled = false,
    error,
    placeholder,
    icon: Icon,
    size = 'md',
    required,
    onBlur,
    onChange,
    defaultValue,
    ...rest
  },
  ref,
) => {
  return (
    <InputContainer
      data-error={!!error}
      data-required={required}
      aria-required={required}
      data-disabled={disabled}
      aria-disabled={disabled}
      data-size={size}
    >
      {Icon && (
        <Icon
          size={size === 'xs' ? 16 : size === 'lg' ? 24 : 16}
          weight="regular"
          data-error={!!error}
          className="text-slate-500 data-[error=true]:text-red-500"
        />
      )}
      <IMaskInput
        id={id || name}
        inputRef={ref}
        mask="(00) 00000-0000"
        className="focus-visible:outline-none w-full flex-1 bg-transparent text-slate-700 text-sm font-medium placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed data-[uppercase=true]:uppercase data-[lowercase=true]:lowercase caret-primary-400"
        placeholder={placeholder}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(evt);
          }
        }}
        onBlur={(evt) => {
          if (onBlur) {
            onBlur(evt);
          }
        }}
        defaultValue={defaultValue}
      />
    </InputContainer>
  );
};

export default forwardRef(InputTelefone);
