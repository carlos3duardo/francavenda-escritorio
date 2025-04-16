'use client';

import { Alert } from '@/components';
import { ApiOperadorProps } from '@/types';
import { useEffect, useState } from 'react';
import { LinksContainer } from './LinksContainer';

export function PageContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState<ApiOperadorProps | undefined>(
    undefined,
  );

  useEffect(() => {
    async function getOperador() {
      await fetch('/api/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (res) => {
          if (res.status === 200) {
            const data = await res.json();
            setUsuario(data);
            console.log({ data });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    getOperador();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (usuario && !usuario.afiliado) {
    return (
      <Alert.Root type="warning">
        <Alert.Message message="Perfil de afiliado não encontrado" />
        <Alert.Description>
          Você precisa estar cadastrado como afiliado para poder divulgar links
          de indicação.
        </Alert.Description>
      </Alert.Root>
    );
  }

  if (usuario && usuario.afiliado?.codigos.length === 0) {
    return (
      <Alert.Root type="warning">
        <Alert.Message message="Seu perfil de afiliado ainda não possui links" />
        <Alert.Description>
          Você precisa possuir códigos de afiliado para poder divulgar seus
          links de parceiro.
        </Alert.Description>
      </Alert.Root>
    );
  }

  if (usuario && usuario.afiliado && usuario.afiliado.codigos.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        <Alert.Root type="hint">
          <Alert.Message message="Divulgue seus links de indicação" />
          <Alert.Description>
            Quando um usuário acessa as páginas da loja através de um de seus
            links de indicação e realiza uma compra, você receberá uma comissão
            pela venda.
            <br />
            Divulgue os seus links de indicação para o seu público.
          </Alert.Description>
        </Alert.Root>

        <LinksContainer
          afiliadoId={usuario.afiliado.id}
          codigos={usuario.afiliado.codigos}
        />
      </div>
    );
  }

  return (
    <Alert.Root type="error">
      <Alert.Message message="Erro desconhecido" />
      <Alert.Description>
        Aconteceu algo estranho aqui.
        <br />
        Por favor, saia do sistema e tente logar novamente.
        <br />
        <br />
        Se o problema persistir, entre em contato com o suporte através do
        e-mail {process.env.NEXT_PUBLIC_EMAIL_SUPORTE}.
      </Alert.Description>
    </Alert.Root>
  );
}
