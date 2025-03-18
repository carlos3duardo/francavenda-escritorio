type AfiliadoProps = {
  id: string;
  situacao: {
    id: number;
    nome: string;
  };
  patrocinador: {
    id: string;
    nome: string;
  } | null;
};

export interface UserCookieProps {
  id: string;
  admin: boolean;
  nome: string;
  apelido: string;
  email: string;
  email_verified_at: string | null;
  senha_validade: string;
  avatar_url: string;
  afiliado: AfiliadoProps | null;
}
