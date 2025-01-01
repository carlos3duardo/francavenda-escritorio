'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { InputProps } from '../FormElements/Input';
import InputMask from '../FormElements/InputMask';
import { ChangeEvent, useEffect } from 'react';

export interface FormInputTextProps extends Omit<InputProps, 'name'> {
  name: string;
  mask: string;
}

export function FormMaskInput({
  id,
  name,
  mask,
  placeholder,
  onChange,
  onBlur,
  isLoading = false,
  isSuccess = false,
}: FormInputTextProps) {
  const { control, getValues, setValue } = useFormContext();

  const defaultValue = getValues(name) ?? '';

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    } else {
      setValue(name, '');
    }
  }, [defaultValue, name, setValue]);

  return (
    <>
      <Controller
        name={name}
        control={control}
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
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        )}
      />
    </>
  );
}
