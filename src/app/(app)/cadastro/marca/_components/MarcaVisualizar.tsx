'use client';
import { ApiMarcaProps } from '@/types';
import { Card } from '@/components';
import { capitalize } from '@/helpers';
import { CheckCircle, Palette, XCircle } from '@phosphor-icons/react/dist/ssr';

import { MarcaLogotipo } from './MarcaLogotipo';
import { MarcaBanner } from './MarcaBanner';

interface MarcaVisualizarProps {
  isLoading: boolean;
  isSuccess: boolean;
  marca: ApiMarcaProps | undefined;
}

export function MarcaVisualizar({
  isLoading,
  isSuccess,
  marca,
}: MarcaVisualizarProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Loader />
      </Card.Root>
    );
  }

  if (isSuccess && marca) {
    return (
      <Card.Root>
        <Card.Header>
          <Card.HeaderSection>
            <Card.Label title={`Dados do marca ${capitalize(marca.nome)}`} />
          </Card.HeaderSection>
        </Card.Header>
        <Card.Separator />
        <Card.Grid>
          <Card.GridItem className="xl:col-span-5" label="Nome">
            {marca.nome}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-4" label="Fornecedor">
            {marca.fornecedor.nome_fantasia}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-3" label="Situação">
            {marca.ativa ? (
              <span className=" flex gap-1 items-center">
                <CheckCircle
                  size={18}
                  weight="fill"
                  className="text-green-500"
                />
                Ativa
              </span>
            ) : (
              <span className="flex gap-1 items-center">
                <XCircle size={18} weight="fill" className="text-red-500" />
                Inativa
              </span>
            )}
          </Card.GridItem>
          <Card.GridItem className="" label="Descrição">
            {marca.descricao}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-4" label="Slug">
            {marca.slug}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-4" label="Registro">
            {marca.registro || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-4" label="Cor">
            <span className="flex gap-1 items-center">
              {marca.cor}
              <Palette size={18} weight="fill" style={{ color: marca.cor }} />
            </span>
          </Card.GridItem>
        </Card.Grid>
        <Card.Separator />
        <Card.Body>
          <div className="w-full grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <MarcaLogotipo
                marcaId={marca.id}
                marcaCor={marca.cor}
                logotipoUrl={marca.logotipo_url}
              />
            </div>

            <div className="col-span-8 flex flex-col items-center gap-4">
              <MarcaBanner
                marcaId={marca.id}
                marcaCor={marca.cor}
                bannerUrl={marca.banner_url}
              />
            </div>
          </div>
        </Card.Body>
      </Card.Root>
    );
  }
}
