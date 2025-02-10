'use client';
import { useFormContext } from 'react-hook-form';
import Select, { SelectProps } from '../FormElements/Select';

export interface FormSelectProps extends Omit<SelectProps, 'name'> {
  name: string;
  valueAsNumber?: boolean;
}

export function FormSelect({
  id,
  name,
  options,
  valueAsNumber = false,
  ...rest
}: FormSelectProps) {
  const { register } = useFormContext();

  return (
    <>
      <Select
        {...register(name, { valueAsNumber })}
        id={id || name}
        options={options}
        {...rest}
      />
    </>
  );
}
