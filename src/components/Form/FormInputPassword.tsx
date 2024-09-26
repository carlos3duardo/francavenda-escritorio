'use client';
import { useFormContext } from 'react-hook-form';
import { InputProps } from '../FormElements/Input';
import InputPassword from '../FormElements/InputPassword';

export interface FormInputTextProps extends Omit<InputProps, 'name'> {
  name: string;
}

export function FormInputPassword({ id, name, ...rest }: FormInputTextProps) {
  const { register } = useFormContext();

  return <InputPassword {...register(name)} id={id || name} {...rest} />;
}
