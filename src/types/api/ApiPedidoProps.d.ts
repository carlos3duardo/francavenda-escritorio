type UsuarioProps = {
  id: string;
  nome: string;
  email?: string | null;
  celular?: string | null;
  cpf?: string | null;
  rg?: string | null;
  rg_emissor?: string | null;
  nascimento?: string | null;
  apelido?: string | null;
  nascimento?: string | null;
  sexo?: {
    id: number;
    nome: string;
  } | null;
  naturalidade?: {
    id: number;
    municipio: string;
    uf: string;
  } | null;
};

type EmpresaProps = {
  id: string;
  nome_fantasia: string;
  razao_social: string;
  cnpj: string;
  ins_estadual?: string | null;
  ins_municipal?: string | null;
  tipo?: {
    id: number;
    nome: string;
  } | null;
  contato?: string | null;
  telefone?: string | null;
  email?: string | null;
  responsavel?: string | null;
  responsavel_cpf?: string | null;
  comenrario?: string | null;
};

type ClienteProps = {
  id: string;
  nome: string;
  natureza: string;
  usuario?: UsuarioProps;
  empresa?: EmpresaProps;
};

type FornecedorProps = {
  id: string;
  nome_fantasia: string;
  razao_social: string;
};

type MarcaProps = {
  id: string;
  nome: string;
  fornecedor?: FornecedorProps;
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
  ativo: boolean;
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
  cliente: ClienteProps;
  produto: ProdutoProps;
  valor: number;
  situacao: SituacaoProps;
  codigo_referencia: string | null;
  forma_pagamento: FormaPagamentoProps;
  afiliado: AfiliadoProps | null;
  created_at: string;
  oferta?: OfertaProps;
  cartao?: CartaoProps | null;
  endereco?: EnderecoProps;
  historico?: HistoricoProps[];
  composicao?: ComposicaoProps[];
  comentarios?: ComentarioProps[];
}
