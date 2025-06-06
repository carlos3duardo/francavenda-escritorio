'use client';
import React, {
  ElementType,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { ConfigProvider, DatePicker, DatePickerProps } from 'antd';
import locale from 'antd/locale/pt_BR';
import dayjs from 'dayjs';

import styles from './Input.module.css';
import { InputContainer } from './InputContainer';

dayjs.locale('pt_BR');

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  id: string;
  name?: string;
  label?: string;
  icon?: ElementType;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  defaultValue?: string;
  onChange?: DatePickerProps['onChange'];
  allowEmpty?: boolean;
}

const DateInput: React.ForwardRefRenderFunction<
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
    icon: Icon,
    size = 'md',
    required,
    defaultValue,
    onChange,
    allowEmpty = true,
    ...rest
  },
  ref,
) => {
  const [dateValue, setDateValue] = useState<string | null>(null);
  const handleChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDateValue(date ? date.format('YYYY-MM-DD') : null);
  };

  useEffect(() => {
    if (defaultValue) {
      setDateValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        components: { DatePicker: { paddingInline: 0 } },
      }}
    >
      <InputContainer
        required={required}
        error={error}
        disabled={disabled}
        size={size}
        className="px-2"
      >
        {Icon && (
          <Icon
            size={size === 'xs' ? 16 : size === 'lg' ? 24 : 16}
            weight="regular"
            data-error={!!error}
            className="text-slate-500 data-[error=true]:text-red-500"
          />
        )}
        <DatePicker
          variant="borderless"
          value={dateValue ? dayjs(dateValue, 'YYYY-MM-DD') : null}
          format={{
            format: 'DD/MM/YYYY',
            type: 'mask',
          }}
          onChange={(date, dateString) => {
            handleChange(date, dateString);
            if (onChange) {
              onChange(date, dateString);
            }
          }}
          style={{
            color: 'var(--tw-color-slate-600)',
            fontFamily: 'inherit',
            fontWeight: 500,
            width: '100%',
          }}
        />
        <input
          ref={ref}
          data-disabled={disabled}
          data-readonly={readOnly}
          data-size={size}
          className={styles.inputElement}
          type="hidden"
          id={id}
          name={name || id}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={dateValue || ''}
        />
      </InputContainer>
    </ConfigProvider>
  );
};

export default forwardRef(DateInput);
