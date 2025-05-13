type AfiliadoProps = {
  id: string;
  nome: string;
  nivel: number;
};

type PatrocinadorProps = {
  id: string;
  nome: string;
  nivel: number;
};

type EmbaixadorProps = {
  id: string;
  nome: string;
  nivel: number;
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
