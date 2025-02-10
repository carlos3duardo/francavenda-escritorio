'use client';
import { useFormContext } from 'react-hook-form';
import Input, { InputProps } from '../FormElements/Input';

export interface FormInputTextProps extends Omit<InputProps, 'name'> {
  name: string;
  valueAsNumber?: boolean;
}

export function FormInputText({
  id,
  name,
  valueAsNumber = false,
  ...rest
}: FormInputTextProps) {
  const { register } = useFormContext();

  return (
    <>
      <Input
        type="text"
        {...register(name, { valueAsNumber })}
        id={id || name}
        {...rest}
      />
    </>
  );
}
