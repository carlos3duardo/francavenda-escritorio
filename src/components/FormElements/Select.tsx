import React, { ElementType, SelectHTMLAttributes, forwardRef } from 'react';
import { InputContainer } from './InputContainer';

export type SelectOption = {
  value: string;
  label: string;
};

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  icon?: ElementType;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  options: SelectOption[] | undefined;
}

const Select: React.ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  {
    id,
    name,
    uppercase = false,
    lowercase = false,
    readOnly = false,
    disabled = false,
    error,
    placeholder,
    icon: Icon,
    size = 'md',
    required,
    options,
    defaultValue,
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
      className="px-1"
    >
      {Icon && (
        <Icon
          size={size === 'xs' ? 16 : size === 'lg' ? 24 : 16}
          weight="regular"
          data-error={!!error}
          className="text-slate-500 data-[error=true]:text-red-500"
        />
      )}
      <select
        ref={ref}
        data-uppercase={uppercase}
        data-lowercase={lowercase}
        data-disabled={disabled}
        data-readonly={readOnly}
        data-size={size}
        className="w-full pr-1 outline-none bg-transparent text-slate-600 dark:text-slate-200 text-sm data-[size=xs]:text-xs data-[size=sm]:text-xs data-[size=lg]:text-lg font-medium placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed data-[uppercase=true]:uppercase data-[lowercase=true]:lowercase caret-blue-400"
        id={id}
        name={name || id}
        disabled={disabled}
        required={required}
        defaultValue={defaultValue}
        {...rest}
      >
        {placeholder && (
          <option value="" className="dark:bg-slate-800">
            {placeholder}
          </option>
        )}
        {options ? (
          options.map((option: SelectOption) => (
            <option
              key={option.value}
              value={option.value}
              className="dark:bg-slate-800 px-0 mx-0"
            >
              {option.label}
            </option>
          ))
        ) : (
          <option value="">Selecione...</option>
        )}
      </select>
    </InputContainer>
  );
};

export default forwardRef(Select);
