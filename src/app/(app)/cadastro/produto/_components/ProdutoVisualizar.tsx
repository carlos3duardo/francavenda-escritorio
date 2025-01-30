'use client';
import { ApiProdutoProps } from '@/types';
import { Badge, Card } from '@/components';
import { capitalize } from '@/helpers';

interface ProdutoVisualizarProps {
  isLoading: boolean;
  isSuccess: boolean;
  produto: ApiProdutoProps | undefined;
}

export function ProdutoVisualizar({
  isLoading,
  isSuccess,
  produto,
}: ProdutoVisualizarProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Loader />
      </Card.Root>
    );
  }

  if (isSuccess && produto) {
    return (
      <Card.Root>
        <Card.Header>
          <Card.HeaderSection>
            <Card.Label
              title={`Dados do produto ${capitalize(produto.nome)}`}
            />
          </Card.HeaderSection>
          <Card.HeaderSection>
            <Badge
              label={produto.ativo ? 'Ativo' : 'Inativo'}
              color={produto.ativo ? '#28a745' : '#dc3545'}
            />
          </Card.HeaderSection>
        </Card.Header>
        <Card.Separator />
        <Card.Grid>
          <Card.GridItem className="md:col-span-6 xl:col-span-4" label="Nome">
            {produto.nome}
          </Card.GridItem>
          <Card.GridItem className="md:col-span-6 xl:col-span-4" label="Marca">
            {produto.marca.nome}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-4"
            label="Coletivo"
          >
            {produto.coletivo ? 'Sim' : 'Não'}
          </Card.GridItem>

          <Card.GridItem
            className="md:col-span-6 xl:col-span-4"
            label="Registro"
          >
            {produto.registro || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem className="md:col-span-6 xl:col-span-4" label="Slug">
            {produto.slug || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-4"
            label="Referência"
            tooltip="Código do produto no fornecedor"
          >
            {produto.referencia || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-12" label="Resumo">
            {produto.resumo}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-12" label="Descrição">
            {produto.descricao || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-12" label="Contrato">
            {produto.contrato?.url || <>&nbsp;</>}
          </Card.GridItem>
        </Card.Grid>
      </Card.Root>
    );
  }
}
