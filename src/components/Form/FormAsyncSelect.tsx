'use client';
import { useController, useFormContext } from 'react-hook-form';
import { AsyncSelect, SelectProps } from '../FormElements/AsyncSelect';

type Option = {
  label: string;
  value: string;
};

export interface FormAsyncSelectProps extends Omit<SelectProps, 'name'> {
  name: string;
  sourceUrl: string;
  valueAsNumber?: boolean;
  defaultOptions?: Option[];
  defaultValue?: string;
}

const FormAsyncSelect = ({
  id,
  name,
  sourceUrl,
  defaultOptions,
}: FormAsyncSelectProps) => {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  return (
    <AsyncSelect
      id={id || name}
      name={name}
      sourceUrl={sourceUrl}
      onChange={(selectedOption) => {
        field.onChange(selectedOption?.value || '');
      }}
      defaultValue={field.value}
      defaultOptions={defaultOptions}
    />
  );
};

export default FormAsyncSelect;
