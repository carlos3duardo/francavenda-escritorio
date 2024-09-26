'use client';
import {
  ComponentProps,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { FormContext } from './FormContext';

type FormProps = ComponentProps<'form'> & {
  method?: 'post' | 'get';
  isSubmitting?: boolean;
  layout?: 'grid' | 'horizontal';
  children: ReactNode;
};

export function FormBody({
  method = 'post',
  onSubmit,
  isSubmitting = false,
  children,
  layout = 'grid',
  ...rest
}: FormProps) {
  const { setIsSubmitting, setLayout } = useContext(FormContext);

  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    if (onSubmit) {
      onSubmit(evt);
    }
  };

  useEffect(() => {
    setIsSubmitting(isSubmitting);
  }, [setIsSubmitting, isSubmitting]);

  useEffect(() => {
    setLayout(layout);
  }, [layout, setLayout]);

  return (
    <form
      method={method}
      className="w-full flex flex-col gap-6 pt-6"
      onSubmit={handleSubmitForm}
      {...rest}
    >
      {children}
    </form>
  );
}
