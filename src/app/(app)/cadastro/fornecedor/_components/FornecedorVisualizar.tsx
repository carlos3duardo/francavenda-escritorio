'use client';
import { CheckCircle, XCircle } from '@phosphor-icons/react/dist/ssr';
import { ApiFornecedorProps } from '@/types';
import { Card } from '@/components';
import { capitalize, maskCep, maskCnpj, maskTelefone } from '@/helpers';
import { FornecedorLogotipo } from './FornecedorLogotipo';

interface FornecedorVisualizarProps {
  isLoading: boolean;
  isSuccess: boolean;
  fornecedor: ApiFornecedorProps | undefined;
}

export function FornecedorVisualizar({
  isLoading,
  isSuccess,
  fornecedor,
}: FornecedorVisualizarProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Loader />
      </Card.Root>
    );
  }

  if (isSuccess && fornecedor) {
    return (
      <Card.Root>
        <Card.Header>
          <Card.HeaderSection>
            <Card.Label
              title={`Dados do fornecedor ${capitalize(fornecedor.nome_fantasia)}`}
            />
          </Card.HeaderSection>
        </Card.Header>
        <Card.Separator />
        <Card.Grid>
          <Card.GridItem className="xl:col-span-6" label="Razão Social">
            {fornecedor.razao_social}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-4" label="Nome fantasia">
            {fornecedor.nome_fantasia}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-2" label="Situação">
            {fornecedor.ativo ? (
              <span className=" flex gap-1 items-center">
                <CheckCircle
                  size={18}
                  weight="fill"
                  className="text-green-500"
                />
                Ativo
              </span>
            ) : (
              <span className="flex gap-1 items-center">
                <XCircle size={18} weight="fill" className="text-red-500" />
                Inativo
              </span>
            )}
          </Card.GridItem>

          <Card.GridItem className="md:col-span-6 xl:col-span-3" label="CNPJ">
            {maskCnpj(fornecedor.cnpj)}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-3"
            label="Inscrição Estadual"
          >
            {fornecedor.ins_estadual || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-3"
            label="Inscrição Municipal"
          >
            {fornecedor.ins_municipal || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-3"
            label="Registro"
          >
            {fornecedor.registro || <>&nbsp;</>}
          </Card.GridItem>
        </Card.Grid>

        <Card.Separator />

        <Card.Grid>
          <Card.GridItem className="xl:col-span-4" label="Endereço">
            {fornecedor.logradouro || <>&nbsp;</>}
            {` `}
            {fornecedor.numero || <>&nbsp;</>}
            {` `}
            {fornecedor.complemento || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-3" label="Bairro">
            {fornecedor.bairro || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-2" label="CEP">
            {fornecedor.cep ? maskCep(fornecedor.cep) : <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-3" label="Município / UF">
            {fornecedor.municipio ? fornecedor.municipio : <>&nbsp;</>}
            {fornecedor.uf ? ` / ${fornecedor.uf}` : <>&nbsp;</>}
          </Card.GridItem>
        </Card.Grid>

        <Card.Separator />

        <Card.Grid>
          <Card.GridItem className="xl:col-span-3" label="Contato">
            {fornecedor.contato || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-2" label="Telefone">
            {fornecedor.telefone ? (
              maskTelefone(fornecedor.telefone)
            ) : (
              <>&nbsp;</>
            )}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-4" label="E-mail">
            {fornecedor.email || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-3" label="Site">
            {fornecedor.site || <>&nbsp;</>}
          </Card.GridItem>
        </Card.Grid>

        <Card.Separator />

        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-12 lg:col-span-7">
            <Card.Grid>
              <Card.GridItem className="" label="Observação">
                {fornecedor.observacao || <>&nbsp;</>}
              </Card.GridItem>
              <Card.GridItem className="" label="Sobre">
                {fornecedor.sobre || <>&nbsp;</>}
              </Card.GridItem>
              <Card.GridItem className="" label="Disclaimer">
                {fornecedor.disclaimer || <>&nbsp;</>}
              </Card.GridItem>
            </Card.Grid>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Card.Grid>
              <Card.GridItem className="" label="Logotipo">
                <FornecedorLogotipo
                  fornecedorId={fornecedor.id}
                  logotipoUrl={fornecedor.logotipo_url}
                />
              </Card.GridItem>
            </Card.Grid>
          </div>
        </div>
      </Card.Root>
    );
  }
}
