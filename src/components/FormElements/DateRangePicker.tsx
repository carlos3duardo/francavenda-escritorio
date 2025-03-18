'use client';
import React, {
  ElementType,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
} from 'react';
import { ConfigProvider, DatePicker, TimeRangePickerProps } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import locale from 'antd/locale/pt_BR';
import dayjs, { Dayjs } from 'dayjs';

import styles from './Input.module.css';
import { InputContainer } from './InputContainer';
import { MoveHorizontal } from 'lucide-react';

dayjs.locale('pt_BR');

type RangeValueType<DateType> = [
  start: DateType | null | undefined,
  end: DateType | null | undefined,
];

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'defaultValue' | 'size' | 'onChange'
  > {
  id: string;
  name?: string;
  label?: string;
  icon?: ElementType;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onChange?: RangePickerProps['onChange'];
  presets?: TimeRangePickerProps['presets'];
  defaultValue?: RangeValueType<Dayjs>;
}

const DateRangePicker: React.ForwardRefRenderFunction<
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
    presets,
    ...rest
  },
  ref,
) => {
  // const [dateValue, setDateValue] = useState<RangeValueType<Dayjs> | undefined>(
  //   undefined,
  // );
  // const handleChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   setDateValue(date ? date.format('YYYY-MM-DD') : null);
  // };

  useEffect(() => {
    if (defaultValue) {
      // setDateValue(defaultValue);
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
      >
        <div
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
          <DatePicker.RangePicker
            variant="borderless"
            format={{
              format: 'DD/MM/YYYY',
              type: 'mask',
            }}
            separator={<MoveHorizontal size={16} color={`#888888  `} />}
            presets={presets}
            defaultValue={defaultValue}
            onChange={onChange}
            style={{
              color: 'var(--tw-color-slate-600)',
              fontFamily: 'inherit',
              fontWeight: 500,
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
            defaultValue=""
          />
        </div>
      </InputContainer>
    </ConfigProvider>
  );
};

export default forwardRef(DateRangePicker);
