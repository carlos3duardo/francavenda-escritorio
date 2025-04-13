import { Select } from '@/components';

interface SelectCodigoAfiliadoProps {
  codigos: string[];
  onChange: (value: string) => void;
}

export function SelectCodigoAfiliado({
  codigos,
  onChange,
}: SelectCodigoAfiliadoProps) {
  return (
    <div className="w-full grid grid-cols-12 gap-2">
      <label
        htmlFor="codigo"
        className="col-span-12 md:col-span-7 xl:col-span-5 2xl:col-span-4 text-sm self-center"
      >
        Seu código de afiliado:
      </label>
      <div className="col-span-12 md:col-span-5 xl:col-span-2">
        <Select
          id="codigo"
          options={codigos?.map((c) => ({ label: c, value: c }))}
          defaultValue={codigos.length ? codigos[0] : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
