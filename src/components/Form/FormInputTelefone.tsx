'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { InputProps } from '../FormElements/Input';
import InputMask from '../FormElements/InputMask';
import { ChangeEvent, useState } from 'react';

export interface FormInputTextProps extends Omit<InputProps, 'name'> {
  name: string;
}

export function FormInputTelefone({
  id,
  name,
  placeholder,
  onChange,
  onBlur,
}: FormInputTextProps) {
  const { control, getValues, setValue } = useFormContext();
  const [mask, setMask] = useState('(00) 0000-00000');

  const defaultValue = getValues(name);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.replace(/\D/g, '');

    if (value.length <= 10) {
      setMask('(00) 0000-00000');
    } else {
      setMask('(00) 00000-0000');
    }
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: {
            onChange: inputOnChange,
            onBlur: inputOnBlur,
            ref,
            ...field
          },
        }) => (
          <InputMask
            {...field}
            id={id || name}
            inputRef={ref}
            mask={mask}
            placeholder={placeholder}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              if (onChange) {
                onChange(evt);
              }
              handleChange(evt);
              inputOnChange(evt);
            }}
            onBlur={(evt) => {
              setValue(name, evt.target.value);
              if (onBlur) {
                onBlur(evt);
              }
              inputOnBlur();
            }}
            defaultValue={defaultValue}
            unmask={false}
          />
        )}
      />
    </>
  );
}
