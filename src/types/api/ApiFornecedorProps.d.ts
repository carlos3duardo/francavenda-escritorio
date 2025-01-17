export interface ApiFornecedorProps {
  id: string;
  nome_fantasia: string;
  razao_social: string;
  cnpj: string;
  registro?: string | null;
  ativo: boolean;
  logotipo_url: string | null;
  ins_estadual?: string | null;
  ins_municipal?: string | null;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  municipio?: string | null;
  uf?: string | null;
  site?: string | null;
  contato?: string | null;
  email?: string | null;
  telefone?: string | null;
  observacao?: string | null;
  sobre?: string | null;
  disclaimer?: string | null;
}
