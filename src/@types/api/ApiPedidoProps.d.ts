type ClienteProps = {
  id: string;
  nome: string;
  email: string;
  documento: string;
};

type FornecedorProps = {
  id: string;
  nome_fantasia: string;
  razao_social: string;
};

type MarcaProps = {
  id: string;
  nome: string;
  fornecedor: FornecedorProps;
};

type ProdutoProps = {
  id: string;
  nome: string;
  marca: MarcaProps;
};

type OfertaProps = {
  id: string;
  nome: string;
  resumo: string;
  beneficiarios: number;
  valor: number;
};

type CartaoProps = {
  portador: string;
  final: string;
  validade: string;
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

type EnderecoProps = {
  id: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  municipio: string;
  uf: string;
};

type HistoricoProps = {
  id: number;
  situacao: {
    id: number;
    nome: string;
    descricao: string;
    cor: string;
  };
  comentario: string;
  dados: string;
  created_at: string;
};

type ComposicaoProps = {
  id: string;
  descricao: string;
  cpf: string | null;
  tipo: {
    id: number;
    nome: string;
  };
  produto: {
    id: string;
    nome: string;
  };
};

type ComentarioProps = {
  id: string;
  comentario: string;
  created_at: string;
  categoria: {
    id: string;
    nome: string;
  };
  usuario: {
    id: string;
    nome: string;
  } | null;
  created_at: string;
};

export interface ApiPedidoProps {
  id: string;
  numero: number;
  valor: number;
  cliente: ClienteProps;
  situacao: SituacaoProps;
  produto: ProdutoProps;
  oferta: OfertaProps;
  forma_pagamento: FormaPagamentoProps;
  cartao?: CartaoProps | null;
  afiliado: AfiliadoProps | null;
  codigo_referencia: string | null;
  ip: string | null;
  created_at: string;
  endereco?: EnderecoProps;
  historico?: HistoricoProps[];
  composicao?: ComposicaoProps[];
  comentarios?: ComentarioProps[];
}
