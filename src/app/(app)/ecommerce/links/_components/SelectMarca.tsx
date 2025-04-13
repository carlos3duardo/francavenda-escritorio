import { Select } from '@/components';
import { ApiMarcaProps } from '@/types';
import { ChangeEvent } from 'react';

interface SelectMarcaProps {
  marcas: ApiMarcaProps[] | undefined;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectMarca({ marcas, onChange }: SelectMarcaProps) {
  return (
    <div className="w-full grid grid-cols-12 gap-2">
      <label
        htmlFor="marca_id"
        className="col-span-12 md:col-span-7 xl:col-span-5 2xl:col-span-4 text-sm self-center"
      >
        Selecione a marca para visualizar os links das ofertas:
      </label>
      <div className="col-span-12 md:col-span-5 xl:col-span-3">
        <Select
          id="marca_id"
          placeholder="Selecione"
          options={marcas
            ?.filter((m) => m.ativa === true)
            .map((marca) => ({
              value: marca.slug,
              label: marca.nome,
            }))}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
