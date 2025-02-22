type FornecedorProps = {
  id: string;
  nome_fantasia: string;
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

export interface ApiOfertaProps {
  id: string;
  nome: string;
  slug: string;
  resumo: string;
  descricao?: string | null;
  beneficiarios: number;
  valor: number;
  ativa: boolean;
  divulgar: boolean;
  homepage: boolean;
  imagem_url: string | null;
  grupo: string;
  produto: ProdutoProps;
}
