import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  id?: string;
  name: string;
  label?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Checkbox: React.ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = (
  {
    id,
    name,
    label,
    uppercase = false,
    lowercase = false,
    readOnly,
    disabled = false,
    error,
    placeholder,
    size = 'md',
    required,
    ...rest
  },
  ref,
) => {
  return (
    <label
      data-size={size}
      className="checkbox-container inline-flex items-center gap-2 relative cursor-pointer text-[1.5rem]"
    >
      <input
        ref={ref}
        id={id}
        name={name || id}
        type="checkbox"
        className="peer absolute opacity-0 cursor-pointer h-0 w-0"
        {...rest}
      />
      <div className="checkmark relative top-0 left-0 bg-white border border-slate-300 rounded transition peer-checked:bg-primary-500 peer-checked:border-primary-500"></div>
      {label && (
        <span data-size={size} className="text-sm data-[size=sm]:text-xs">
          {label}
        </span>
      )}
      {error && (
        <span className="text-red-400 text-xs font-medium">{error}</span>
      )}

      <style jsx>{`
        .checkbox-container {
          user-select: none;
          .checkmark {
            width: 20px;
            height: 20px;
          }
          .checkmark:after {
            content: '';
            position: absolute;
            left: 6px;
            top: 2px;
            width: 6px;
            height: 12px;
            border: solid #ffffff;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
        }
      `}</style>
    </label>
  );
};

export default forwardRef(Checkbox);
