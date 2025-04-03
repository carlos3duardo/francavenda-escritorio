'use client';
import { useFormContext } from 'react-hook-form';
import Textarea, { TextareaProps } from '../FormElements/Textarea';

export interface FormTextareaProps extends Omit<TextareaProps, 'name'> {
  name: string;
  valueAsNumber?: boolean;
}

export function FormTextarea({
  id,
  name,
  valueAsNumber = false,
  ...rest
}: FormTextareaProps) {
  const { register } = useFormContext();

  return (
    <Textarea
      {...register(name, { valueAsNumber })}
      id={id || name}
      {...rest}
    />
  );
}
