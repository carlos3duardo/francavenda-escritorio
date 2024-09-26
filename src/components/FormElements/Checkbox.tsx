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
    <label className="cursor-pointer flex items-center gap-2">
      <input
        ref={ref}
        id={id}
        name={name || id}
        type="checkbox"
        className="hidden peer"
        {...rest}
      />
      <svg
        viewBox="0 0 64 64"
        height="1em"
        width="1em"
        className="overflow-visible"
      >
        <path
          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
          pathLength="575.0541381835938"
          className="path transition-[stroke-dasharray,stroke-dashoffset] duration-500 ease stroke-slate-400 peer-checked:stroke-primary-600"
        />
      </svg>
      {label && <span>{label}</span>}
      {error && (
        <span className="text-red-400 text-xs font-medium">{error}</span>
      )}

      <style jsx>{`
        .path {
          fill: none;
          stroke-width: 6;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 241 9999999;
          stroke-dashoffset: 0;
        }

        .peer:checked ~ svg .path {
          stroke-dasharray: 70.5096664428711 9999999;
          stroke-dashoffset: -262.2723388671875;
        }
      `}</style>
    </label>
  );
};

export default forwardRef(Checkbox);
