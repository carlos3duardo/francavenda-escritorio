'use client';
import { useFormContext } from 'react-hook-form';
import DateInput, { InputProps } from '../FormElements/DateInput';
import { useCallback } from 'react';
import { Dayjs } from 'dayjs';

export interface FormDateInputProps extends Omit<InputProps, 'name'> {
  name: string;
}

export function FormDateInput({ id, name, ...rest }: FormDateInputProps) {
  const { register, getValues, setValue } = useFormContext();

  const defaultValue = getValues(name);

  const handleChange = useCallback(
    (date: Dayjs) => {
      if (date) {
        setValue(name, date.format('YYYY-MM-DD'));
      } else {
        setValue(name, '');
      }
    },
    [name, setValue],
  );

  return (
    <DateInput
      type="text"
      {...register(name)}
      id={id || name}
      defaultValue={defaultValue}
      onChange={(date) => handleChange(date)}
    />
  );
}
