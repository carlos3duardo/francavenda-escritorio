'use client';
import { useOferta } from '@/hooks';
import { NovoPedidoFormularioPessoaJuridica } from './NovoPedidoFormularioPessoaJuridica';
import { NovoPedidoFormularioPessoaFisica } from './NovoPedidoFormularioPessoaFisica';

interface ComponentProps {
  ofertaId: string;
}
export function NovoPedidoFormularioCadastro({ ofertaId }: ComponentProps) {
  const { data: oferta, isLoading, isSuccess } = useOferta(ofertaId);

  if (isLoading) {
    return <div>Carregando</div>;
  }

  if (isSuccess && oferta) {
    return oferta.produto.empresarial ? (
      <NovoPedidoFormularioPessoaJuridica oferta={oferta} />
    ) : (
      <NovoPedidoFormularioPessoaFisica oferta={oferta} />
    );
  }

  return <div>Erro</div>;
}
