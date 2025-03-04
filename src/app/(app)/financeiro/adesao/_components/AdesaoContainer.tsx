'use client';
import { Alert, Button, Card, Loader } from '@/components';
import { dateBr } from '@/helpers';
import { useAfiliadoAdesao } from '@/hooks';

export function AdesaoContainer() {
  const { data: adesao, error, isLoading } = useAfiliadoAdesao('234');

  if (isLoading) {
    return (
      <div className="flex flex-row gap-2 items-center mt-4">
        <span>
          <Loader.Comet size="sm" />
        </span>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Carregando...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert.Root type="error">
        <Alert.Message message={error.message} />
        <Alert.Description>
          Ocorreu um erro ao consultar a adesão.
          <br />
          Você não possui uma adesão gerada, ou não possui perfil de afiliado.
          <br />
          Para mais informações, entre em contato com o seu suporte.
        </Alert.Description>
      </Alert.Root>
    );
  }

  if (adesao) {
    return (
      <div className="flex flex-col gap-4">
        {adesao.pagamento ? (
          <Alert.Root type="success">
            <Alert.Message message="Pagamento da adesão efetuado." />
            <Alert.Description>
              Sua taxa de inscrição foi recebida com sucesso.
              <br />
              Vocẽ já está apto para indicar seus links de afiliado.
            </Alert.Description>
          </Alert.Root>
        ) : adesao.isentado ? (
          <Alert.Root type="info">
            <Alert.Message message="Sua adesão foi isentada." />
            <Alert.Description>
              Você foi beneficiado pela isenção da taxa de inscrição.
              <br />
              Você está apto para compartilhar seus links de afiliado e ser
              remunerado por cada venda realizada através dos links.
            </Alert.Description>
          </Alert.Root>
        ) : (
          <Alert.Root type="warning">
            <Alert.Message message="Aguardando pagamento." />
            <Alert.Description>
              Ainda não identificamos o pagamento da sua taxa de inscrição.
              <br />
              Você só estará apto para receber comissões depois de regularizar
              sua situação.
            </Alert.Description>
          </Alert.Root>
        )}
        <Card.Root>
          <Card.Body>
            <div className="grid grid-cols-12 gap-2 text-sm">
              <div className="col-span-6 xl:col-span-2 text-right">
                Vencimento:
              </div>
              <div className="col-span-6 xl:col-span-10">
                {dateBr(adesao.vencimento)}
              </div>

              <div className="col-span-6 xl:col-span-2 text-right">Valor:</div>
              <div className="col-span-6 xl:col-span-10">R$ {adesao.valor}</div>

              <div className="col-span-6 xl:col-span-2 text-right">
                Situação:
              </div>
              <div className="col-span-6 xl:col-span-10">
                {adesao.pagamento
                  ? `Pago em ${dateBr(adesao.pagamento)}`
                  : adesao.isentado
                    ? 'Isento'
                    : 'Pendente'}
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <div className="w-full flex justify-end">
              <Button>Pagar</Button>
            </div>
          </Card.Footer>
        </Card.Root>
      </div>
    );
  }

  return <>...</>;
}
