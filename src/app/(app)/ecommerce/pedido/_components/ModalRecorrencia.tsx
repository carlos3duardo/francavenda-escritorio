'use client';
import { useCallback, useState } from 'react';
import { Modal } from 'antd';
import { Button, Card } from '@/components';
import Select from '@/components/FormElements/Select';
import { currency, dateBr } from '@/helpers';

type RecorrenciaProps = {
  id: number;
  sequencial: number;
  codigo_referencia: string;
  vencimento: string;
  valor: number;
  pagamento: string | null;
  baixa: string | null;
};

type ItemProps = {
  id: string;
  descricao: string;
  cpf: string | null;
  ativo: boolean;
  tipo: {
    id: number;
    nome: string;
  };
  produto: {
    id: string;
    nome: string;
  };
};

interface ComponentProps {
  pedidoId: string;
  composicao: ItemProps[];
}

export function ModalRecorrencia({ pedidoId, composicao }: ComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [recorrencias, setRecorrencias] = useState<RecorrenciaProps[]>([]);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const fetchRecorrencia = useCallback(
    (itemId: string) => {
      if (itemId === '') {
        setRecorrencias([]);
        return;
      }
      fetch(`/api/pedido/${pedidoId}/recorrencia/${itemId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRecorrencias(data.recorrencia);
        });
    },
    [pedidoId],
  );

  return (
    <>
      <Button size="xs" onClick={handleOpenModal}>
        Pagamentos
      </Button>
      <Modal
        title="Pagamentos recorrentes"
        open={isOpen}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
        width="50%"
        footer={[
          <Button
            key="fechar"
            size="sm"
            color="primary"
            variant="outline"
            onClick={handleCloseModal}
          >
            Fechar
          </Button>,
        ]}
      >
        <Card.Root>
          <Card.Header>
            <Card.HeaderSection className="w-full">
              <label htmlFor="item">Selecione o usuário</label>
              <Select
                id="item"
                name="item"
                onChange={(evt) => fetchRecorrencia(evt.target.value)}
                options={[{ value: '', label: 'Selecione' }].concat(
                  composicao.map((item) => {
                    if (item.ativo) {
                      return { value: item.id, label: item.descricao };
                    }

                    return {
                      value: item.id,
                      label: item.descricao.concat(' (inativo)'),
                    };
                  }),
                )}
              />
            </Card.HeaderSection>
          </Card.Header>
          <Card.Separator />
          <Card.Body>
            {recorrencias.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="bg-slate-100 text-sm font-medium uppercase py-1 text-center">
                      #
                    </th>
                    <th className="bg-slate-100 text-sm font-medium uppercase py-1 text-center">
                      Vencimento
                    </th>
                    <th className="bg-slate-100 text-sm font-medium uppercase py-1 text-right">
                      Valor
                    </th>
                    <th className="bg-slate-100 text-sm font-medium uppercase py-1 text-center">
                      Pagamento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recorrencias.map((recorrencia) => (
                    <tr key={recorrencia.id}>
                      <td className="text-sm border-t border-t-slate-200 py-1 text-center">
                        {recorrencia.sequencial}
                      </td>
                      <td className="text-sm border-t border-t-slate-200 py-1 text-center">
                        {dateBr(recorrencia.vencimento)}
                      </td>
                      <td className="text-sm border-t border-t-slate-200 py-1 text-right">
                        {currency(recorrencia.valor)}
                      </td>
                      <td className="text-sm border-t border-t-slate-200 py-1 text-center">
                        {dateBr(recorrencia.pagamento)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Nenhuma mensalidade identificada</div>
            )}
          </Card.Body>
        </Card.Root>
      </Modal>
    </>
  );
}
