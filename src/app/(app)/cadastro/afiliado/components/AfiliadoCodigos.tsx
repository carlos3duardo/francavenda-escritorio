'use client';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Plus, X } from '@phosphor-icons/react/dist/ssr';
import { Alert, Button, Card, Input } from '@/components';
import { useAfiliadoCodigos } from '@/hooks';

interface AfiliadoCodigosProps {
  afiliadoId: string;
}

export function AfiliadoCodigos({ afiliadoId }: AfiliadoCodigosProps) {
  const maximo = 3;
  const [novoCodigo, setNovoCodigo] = useState<string>('');
  const [codigos, setCodigos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, isLoading, isError } = useAfiliadoCodigos(afiliadoId);

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
      Swal.fire({
        title: 'Confirma remover o código?',
        text: 'Se outro afiliado usar esse código, você não poderá recuperá-lo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Remover',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          return axios
            .delete(`/api/afiliado/${afiliadoId}/codigo/${codigo}`)
            .then((response) => {
              setCodigos((codigos) => codigos.filter((c) => c !== codigo));
            })
            .catch((error) => {
              Swal.showValidationMessage(`Erro: ${error.message}`);
            })
            .finally(() => setIsSubmitting(false));
        },
      });
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
        {isLoading ? (
          <div className="flex flex-col 2xl:flex-row gap-4 items-center justify-center py-4">
            <div className="w-6 h-6 rounded-full animate animate-spin border-2 border-gray-300 dark:border-gray-600 border-t-primary-500 dark:border-t-primary-400" />
            <p className="text-base font-medium text-center">
              Carregando os códigos do afiliado...
            </p>
          </div>
        ) : isError ? (
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
