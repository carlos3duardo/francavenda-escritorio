'use client';
import { Alert, Button, Card, Input } from '@/components';
import { useAfiliadoCodigos } from '@/hooks';
import { Plus, X } from '@phosphor-icons/react/dist/ssr';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface AfiliadoCodigosProps {
  afiliadoId: string;
}

export function AfiliadoCodigos({ afiliadoId }: AfiliadoCodigosProps) {
  const maximo = 3;
  const [novoCodigo, setNovoCodigo] = useState<string>('');
  const [codigos, setCodigos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, isError } = useAfiliadoCodigos(afiliadoId);

  useEffect(() => {
    if (data) {
      setCodigos(data);
    }
  }, [data]);

  const handleAdicionarCodigo = useCallback(
    (codigo: string) => {
      setIsSubmitting(true);

      axios
        .post(`/api/afiliado/${afiliadoId}/codigo`, {
          codigo,
        })
        .then(() => {
          setCodigos((codigos) => [...codigos, codigo]);
          setNovoCodigo('');
        })
        .catch((error) => {
          if (error.status === 409) {
            toast.error(`Código [${codigo}] já está sendo utilizado.`);
          }
        })
        .finally(() => setIsSubmitting(false));
    },
    [afiliadoId],
  );

  const handleRemoverCodigo = useCallback(
    (codigo: string) => {
      axios
        .delete(`/api/afiliado/${afiliadoId}/codigo/${codigo}`)
        .then((response) => {
          setCodigos((codigos) => codigos.filter((c) => c !== codigo));
        })
        .finally(() => setIsSubmitting(false));
    },
    [afiliadoId],
  );

  return (
    <Card.Root>
      <Card.Header>
        <Card.HeaderSection>
          <Card.Label
            title="Códigos do afiliado"
            subtitle="Para divulgação dos seus links de venda"
          />
        </Card.HeaderSection>
      </Card.Header>
      <Card.Separator />
      <Card.Body>
        {isError ? (
          <Alert.Root type="error">
            <Alert.Message message="Erro ao carregar os códigos." />
            <Alert.Description>
              Erro desconhecido ao tentar carregar os códigos.
              <br />
              Por favor, tente novamente mais tarde.
            </Alert.Description>
          </Alert.Root>
        ) : (
          <div className="flex flex-col gap-4">
            {codigos.length === 0 && (
              <Alert.Root type="warning">
                <Alert.Message message="Afiliado sem código" />
                <Alert.Description>
                  É preciso adicionar códigos para divulgar os links de venda.
                </Alert.Description>
              </Alert.Root>
            )}

            <div className="flex flex-col gap-2">
              {codigos.map((codigo) => {
                return (
                  <div key={codigo} className="flex gap-2">
                    <Input id={`codigo.${codigo}`} value={codigo} readOnly />
                    <Button
                      color="danger"
                      onClick={() => handleRemoverCodigo(codigo)}
                    >
                      <X size={18} weight="bold" />
                    </Button>
                  </div>
                );
              })}

              {codigos.length < maximo && (
                <div className="flex gap-2">
                  <Input
                    id="codigo.adicionar"
                    value={novoCodigo}
                    onChange={(e) => setNovoCodigo(e.target.value)}
                    autoComplete="off"
                  />
                  <Button
                    color="primary"
                    onClick={() => handleAdicionarCodigo(novoCodigo)}
                    isLoading={isSubmitting}
                  >
                    <Plus size={18} weight="bold" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Card.Body>
    </Card.Root>
  );
}
