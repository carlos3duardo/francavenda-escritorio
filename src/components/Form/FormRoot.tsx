'use client';
import {
  FormProvider as ReactHookFormProvider,
  FormProviderProps,
} from 'react-hook-form';
import { FormProvider } from './FormContext';

interface FormRootProps extends FormProviderProps<any, any> {}

export function FormRoot({ children, ...rest }: FormRootProps) {
  return (
    <ReactHookFormProvider {...rest}>
      <FormProvider>{children}</FormProvider>
    </ReactHookFormProvider>
  );
}
