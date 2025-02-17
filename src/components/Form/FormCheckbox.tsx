'use client';
import { useFormContext } from 'react-hook-form';
import Checkbox, { CheckboxProps } from '../FormElements/Checkbox';

export interface FormCheckboxProps extends Omit<CheckboxProps, 'name'> {
  name: string;
}

export function FormCheckbox({ id, name, ...rest }: FormCheckboxProps) {
  const { register } = useFormContext();

  return (
    <>
      <Checkbox {...register(name)} id={id || name} {...rest} />
    </>
  );
}
