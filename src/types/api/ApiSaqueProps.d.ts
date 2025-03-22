type AfiliadoProps = {
  id: string;
  nome: string;
  apelido: string;
};

type AnexoProps = {
  id: string;
  filename: string;
  original_filename: string;
  size: number;
  filetype: string;
  tipo: {
    id: string;
    nome: string;
  };
};

export interface ApiSaqueProps {
  id: string;
  gerado: string;
  valor: number;
  afiliado: AfiliadoProps;
  efetivado: string | null;
  solicitante: string;
  executante: string | null;
  anexos: AnexoProps[];
}
