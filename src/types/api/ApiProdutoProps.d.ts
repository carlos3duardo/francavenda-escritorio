type ContratoProps = {
  id: string;
  filename: string;
  url: string;
  size: number;
};

type MarcaProps = {
  id: string;
  nome: string;
  slug?: string;
  cor?: string;
  logotipo?: {
    id: string;
    url: string;
  } | null;
  banner?: {
    id: string;
    url: string;
  } | null;
  fornecedor: {
    id: string;
    nome_fantasia: string;
    logotipo_url: string;
  };
};

export interface ApiProdutoProps {
  id: string;
  nome: string;
  resumo?: string | null;
  descricao?: string | null;
  slug?: string | null;
  referencia?: string | null;
  registro?: string | null;
  coletivo?: boolean;
  ativo: boolean;
  contrato?: ContratoProps | null;
  marca: MarcaProps;
  created_at: string;
}
