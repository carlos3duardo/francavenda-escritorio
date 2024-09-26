'use client';
import Button, { ButtonProps } from '../Button';
import { useFormContext } from 'react-hook-form';

export function FormSubmitButton({ children, ...rest }: ButtonProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button type="submit" color="primary" isLoading={isSubmitting} {...rest}>
      {children}
    </Button>
  );
}
