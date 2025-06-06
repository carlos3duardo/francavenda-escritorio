'use client';
import { ElementType, useState } from 'react';
import ReactAsyncSelect from 'react-select/async';
import { InputContainer } from './InputContainer';
import axios from 'axios';

export type SelectOption = {
  value: string;
  label: string;
};

export interface SelectProps {
  id: string;
  name?: string;
  label?: string;
  sourceUrl: string;
  defaultOptions?: SelectOption[];
  defaultValue?: string;
  onInputChange?: (input: string) => void;
  onChange?: (value: any) => void;
  placeholder?: string;
  noOptionsMessage?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  icon?: ElementType;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  options?: SelectOption[] | undefined;
  disabled?: boolean;
  loadOptions?: [];
}

export function AsyncSelect({
  id,
  name,
  options,
  sourceUrl,
  defaultOptions,
  defaultValue,
  onInputChange,
  onChange,
  placeholder = 'Faça uma busca',
  noOptionsMessage = 'Nenhum resultado encontrado',
}: SelectProps) {
  const [isLoading, setLoading] = useState(false);

  const searchValues = async (inputValue: string) => {
    if (!inputValue || inputValue.length < 3) return [];

    try {
      const { data } = await axios.get(`${sourceUrl}?q=${inputValue}`);

      const selectOptions = data.map((option: SelectOption) => ({
        label: option.label,
        value: option.value.toString(),
      }));

      return selectOptions;
    } catch (error) {
      console.error('Erro durante a busca.', error);
    } finally {
      setLoading(false);
    }
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<SelectOption[]>((resolve) => {
      resolve(searchValues(inputValue));
    });

  return (
    <InputContainer>
      <ReactAsyncSelect
        id={id}
        name={name || id}
        classNamePrefix="react-select"
        options={options}
        loadOptions={promiseOptions}
        onInputChange={onInputChange}
        onChange={onChange}
        value={defaultOptions?.find((option) => option.value === defaultValue)}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsMessage}
        isLoading={isLoading}
        defaultOptions={defaultOptions}
        isClearable
        classNames={{
          input: () => 'text-slate-600',
          singleValue: () => 'text-slate-600',
        }}
        styles={{
          container: () => ({
            width: '100%',
            font: 'Public_Sans',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            fontWeight: '500',
          }),
          control: () => ({
            width: '100%',
            display: 'flex',
            border: 'none',
            margin: '0',
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            fontFamily: 'inherit',
            color: 'nome',
          }),
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            padding: '0 4px 0 0',
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            padding: '8px 0 8px 8px',
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: 'none',
          }),
        }}
      />
    </InputContainer>
  );
}
