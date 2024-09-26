'use client';
import { useFormContext } from 'react-hook-form';
import Select, { SelectProps } from '../FormElements/Select';

export interface FormSelectProps extends Omit<SelectProps, 'name'> {
  name: string;
}

export function FormSelect({ id, name, options, ...rest }: FormSelectProps) {
  const { register } = useFormContext();

  return (
    <>
      <Select {...register(name)} id={id || name} options={options} {...rest} />
    </>
  );
}
