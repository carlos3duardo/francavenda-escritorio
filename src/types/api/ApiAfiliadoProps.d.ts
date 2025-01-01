type UsuarioProps = {
  id: string;
  nome: string;
  apelido: string;
  nascimento: string | null;
  sexo: {
    id: number;
    nome: string;
  } | null;
  mae: string;
  email: string;
  celular: string;
  cpf: string;
  rg: string;
  rg_emissor: string;
};

type PatrocinadorProps = {
  id: string;
  nome: string;
  apelido: string;
};

type BancoProps = {
  id: string;
  codigo: string;
  nome: string;
};

type ServicoAssinaturaProps = {
  id: number;
  nome: string;
  isento: boolean;
};

type SituacaoProps = {
  id: number;
  nome: string;
  descricao?: string;
  cor: string;
  data: string;
};

export interface ApiAfiliadoProps {
  id: string;
  usuario: UsuarioProps;
  level?: number;
  patrocinador?: PatrocinadorProps | null;
  banco: BancoProps | null;
  agencia?: string | null;
  conta?: string | null;
  operacao?: string | null;
  pix_chave_tipo?: string | null;
  pix_chave_valor?: string | null;
  servico_assinatura: ServicoAssinaturaProps | null;
  servico_assinatura_codigo: string | null;
  situacao: SituacaoProps;
  ultima_atividade: string | null;
  created_at: string;
}
