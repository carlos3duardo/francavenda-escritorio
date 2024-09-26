import React, { ElementType, SelectHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

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
    <div
      data-error={!!error}
      data-required={required}
      aria-required={required}
      data-disabled={disabled}
      aria-disabled={disabled}
      data-size={size}
      className={styles.inputContainer}
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
        className={styles.inputElement}
        id={id}
        name={name || id}
        disabled={disabled}
        required={required}
        defaultValue={defaultValue}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options ? (
          options.map((option: SelectOption) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option value="">Selecione...</option>
        )}
      </select>
    </div>
  );
};

export default forwardRef(Select);
