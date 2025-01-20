export interface ApiMarcaProps {
  id: string;
  nome: string;
  descricao?: string;
  slug?: string;
  registro?: string | null;
  cor?: string;
  logotipo_url?: string | null;
  banner_url?: string | null;
  ativa: boolean;
  fornecedor: {
    id: string;
    nome_fantasia: string;
    razao_social?: string;
  };
  created_at?: string;
}
