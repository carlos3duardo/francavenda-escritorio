export interface ApiAfiliadoAdesaoProps {
  id: string;
  vencimento: string;
  valor: number;
  pagamento: string | null;
  pago: number | null;
  baixa: string | null;
  isentado: boolean;
  comentario: string | null;
  message?: string;
}
