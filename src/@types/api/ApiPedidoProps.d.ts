type ClienteProps = {
  id: string;
  nome: string;
};

type MarcaProps = {
  id: string;
  nome: string;
};

type ProdutoProps = {
  id: string;
  nome: string;
  marca: MarcaProps;
};

type SituacaoProps = {
  id: number;
  nome: string;
  descricao: string;
  cor: string;
  data: string;
  dados: any;
  comentario: string;
};

type FormaPagamentoProps = {
  id: number;
  nome: string;
};

type AfiliadoProps = {
  id: string;
  nome: string;
};

export interface ApiPedidoProps {
  id: string;
  numero: number;
  cliente: ClienteProps;
  produto: ProdutoProps;
  valor: number;
  data_compra: string;
  situacao: SituacaoProps;
  codigo_referencia: string | null;
  forma_pagamento: FormaPagamentoProps;
  afiliado: AfiliadoProps | null;
}
