'use client';
import { useFormContext } from 'react-hook-form';
import Input, { InputProps } from '../FormElements/Input';

export interface FormInputTextProps extends Omit<InputProps, 'name'> {
  name: string;
}

export function FormInputText({ id, name, ...rest }: FormInputTextProps) {
  const { register } = useFormContext();

  return (
    <>
      <Input type="text" {...register(name)} id={id || name} {...rest} />
    </>
  );
}
