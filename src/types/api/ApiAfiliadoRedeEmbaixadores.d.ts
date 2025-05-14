type AfiliadoProps = {
  id: string;
  nome: string;
  email: string;
  nivel: number;
  avatar_url: string | null;
};

type PatrocinadorProps = {
  id: string;
  nome: string;
  email: string;
  nivel: number;
  avatar_url: string | null;
};

type EmbaixadorProps = {
  id: string;
  nome: string;
  email: string;
  nivel: number;
  avatar_url: string | null;
  situacao: {
    id: number;
    nome: string;
    cor: string;
    ativo: boolean;
  };
  created_at: string;
  embaixadores: EmbaixadorProps[];
};

export interface ApiAfiliadoRedeEmbaixadores {
  afiliado: AfiliadoProps;
  patrocinadores?: PatrocinadorProps[];
  embaixadores: EmbaixadorProps[];
}
