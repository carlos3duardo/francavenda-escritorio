type CategoriaProps = {
  id: string;
  nome: string;
  cor: string;
};

type AfiliadoProps = {
  id: string;
  nome: string;
  apelido: string;
};

type MensalidadeProps = {
  id: string;
  vencimento: string;
  valor: number;
  pagamento: string | null;
  baixa: string | null;
  comentario: string | null;
};

type ProdutoProps = {
  id: string;
  nome: string;
  marca: string;
};

export interface ApiLancamentoProps {
  id: string;
  numero: number;
  gerado: string;
  efetivado: string | null;
  categoria: CategoriaProps;
  afiliado: AfiliadoProps;
  descricao: string;
  comentario: string | null;
  valor: number;
  mensalidade: MensalidadeProps | null;
  produto: ProdutoProps | null;
}
