'use client';

import React, {
  ElementType,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from 'react';
import styles from './Input.module.css';
import { Eye, EyeOff, KeyRound } from 'lucide-react';
import { InputContainer } from './InputContainer';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string;
  name?: string;
  label?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  icon?: ElementType;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const InputPassword: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  {
    id,
    name,
    readOnly,
    disabled = false,
    error,
    placeholder,
    icon: Icon = KeyRound,
    size = 'md',
    required,
    ...rest
  },
  ref,
) => {
  const [showPassword, setShowPassword] = useState(false);

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
          size={size === 'xs' ? 16 : size === 'lg' ? 24 : 20}
          weight="regular"
          data-error={!!error}
          className="text-slate-500 data-[error=true]:text-red-500"
        />
      )}
      <input
        ref={ref}
        data-disabled={disabled}
        data-readonly={readOnly}
        data-size={size}
        className={styles.inputElement}
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name || id}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        title={showPassword ? 'Esconder senha' : 'Exibir senha'}
        className="text-slate-500 mr-1"
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </InputContainer>
  );
};

export default forwardRef(InputPassword);
