'use client';
import { Card } from '@/components';
import { useOferta } from '@/hooks';

interface ComponentProps {
  ofertaId: string;
}
export function NovoPedidoFormularioCadastro({ ofertaId }: ComponentProps) {
  const { data: oferta } = useOferta(ofertaId);

  return (
    <div>
      <Card.Root>
        <Card.Header>
          <Card.Label title="Definições" />
        </Card.Header>
        <Card.Separator />
        <Card.Body>
          <pre className="text-xs font-medium text-slate-400">
            {JSON.stringify(oferta, null, 2)}
          </pre>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
