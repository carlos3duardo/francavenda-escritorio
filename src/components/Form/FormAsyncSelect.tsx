'use client';

import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { AsyncSelect, SelectProps } from '../FormElements/AsyncSelect';

type Option = {
  label: string;
  value: string;
};

export interface FormAsyncSelectProps extends Omit<SelectProps, 'name'> {
  name: string;
  valueAsNumber?: boolean;
  defaultValue?: Option;
}

const FormAsyncSelect = ({ id, name, defaultValue }: FormAsyncSelectProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  const fetchCities = debounce(async (inputValue: string) => {
    if (!inputValue) return;
    setLoading(true);

    try {
      const { data } = await axios.get(`/api/municipio?q=${inputValue}`);

      const fetchOptions = data.data.map((row: any) => ({
        label: `${row.nome} - ${row.uf.sigla}`,
        value: row.id.toString(),
      }));

      setOptions(fetchOptions);
    } catch (error) {
      console.error('Erro ao buscar cidades', error);
    } finally {
      setLoading(false);
    }
  }, 300);

  return (
    <AsyncSelect
      id={id || name}
      name={name}
      options={options}
      onInputChange={fetchCities}
      onChange={(selectedOption) => {
        field.onChange(selectedOption?.value || '');
      }}
      isLoading={loading}
    />
  );
};

export default FormAsyncSelect;
