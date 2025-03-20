'use client';
import React, { ChangeEvent, ElementType, forwardRef } from 'react';
import { IMaskInput, IMaskInputProps } from 'react-imask';
import Image from 'next/image';
import { Check } from 'lucide-react';
import spinner from '@/assets/images/spinners/ring-with-bg.svg';
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
  isLoading?: boolean;
  isSuccess?: boolean;
}

const InputMoney: React.ForwardRefRenderFunction<
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
    isLoading = false,
    isSuccess = false,
    className,
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
      className={className}
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
        mask={Number}
        scale={2}
        thousandsSeparator=""
        padFractionalZeros={true}
        autofix={true}
        radix=","
        className="w-full outline-none bg-transparent text-slate-600 dark:text-slate-200 text-sm data-[size=xs]:text-xs data-[size=sm]:text-xs data-[size=lg]:text-lg font-medium placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed data-[uppercase=true]:uppercase data-[lowercase=true]:lowercase caret-blue-400"
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
      {isLoading && (
        <Image src={spinner} width={20} height={20} alt="Carregando..." />
      )}
      {isSuccess && <Check size={20} className="text-green-500" />}
    </InputContainer>
  );
};

export default forwardRef(InputMoney);
