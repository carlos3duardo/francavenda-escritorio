type AfiliadoProps = {
  id: string;
  situacao: {
    id: number;
    nome: string;
    cor: string;
    data: string;
  };
  codigos: string[];
  banco: string | null;
  agencia: string | null;
  conta: string | null;
  operacao: string | null;
  pix: {
    tipo: string;
    valor: string;
  };
};

export interface ApiOperadorProps {
  id: number;
  admin: boolean;
  nome: string;
  apelido: string | null;
  email: string;
  login: string;
  celular: string;
  cpf: string;
  rg: string;
  rg_emissor: string;
  avatar_url: string | null;
  naturalidade: string | null;
  mae: string | null;
  nascimento: string | null;
  afiliado: AfiliadoProps | null;
}
