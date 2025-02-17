'use client';
import { useFormContext } from 'react-hook-form';
import { Alert } from '../Alert';

export function FormError() {
  const {
    formState: { errors },
  } = useFormContext();

  if (errors.root?.serverError) {
    return (
      <Alert.Root type="error">
        <Alert.Message message={errors.root.serverError?.message} />
      </Alert.Root>
    );
  }

  return null;
}
