'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

type FormLayout = 'grid' | 'horizontal';

interface FormContextProps {
  layout?: FormLayout;
  setLayout: Dispatch<SetStateAction<FormLayout>>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

export const FormContext = createContext({} as FormContextProps);

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [layout, setLayout] = useState<FormLayout>('grid');

  return (
    <FormContext.Provider
      value={{
        layout,
        setLayout,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
