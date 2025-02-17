export interface ApiAdesaoProps {
  id: string;
  vencimento: string;
  valor: number;
  pagamento: string | null;
  baixa: string | null;
  isentado: boolean;
  comentario: string | null;
  afiliado: {
    id: string;
    nome: string;
    apelido: string;
    situacao: {
      id: number;
      nome: string;
      descricao: string;
    };
  };
}
