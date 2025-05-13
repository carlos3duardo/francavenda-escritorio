'use client';

import Image from 'next/image';
import { SharedLink } from './SharedLink';
import mobileShoppingIcon from '@/assets/images/mobile-shopping-icon.png';
import Link from 'next/link';
import { Alert, Button } from '@/components';
import { useEffect, useState } from 'react';
import { ApiOperadorProps } from '@/types';

export function LinksAfiliado() {
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
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    getOperador();
  }, []);

  return (
    <div className="bg-gradient-to-b from-primary-200 to-primary-400 dark:from-primary-700 dark:to-primary-900 rounded-md">
      <div className="w-full flex flex-row items-center">
        <div className="flex-grow flex flex-col justify-between gap-4 p-4 2xl:p-6">
          <h2 className="text-xl font-semibold">
            Divulge seus links de indicação
            <span className="block text-sm">
              Divulgue os seus links de indicação para o seu público.
            </span>
          </h2>
          {isLoading ? (
            <div>Carregando...</div>
          ) : usuario?.afiliado && usuario.afiliado.codigos.length > 0 ? (
            <>
              <div className="flex flex-col gap-4 2xl:gap-6">
                <SharedLink
                  label="Página principal do e-commerce"
                  url={`${process.env.NEXT_PUBLIC_ECOMMERCE_URL}?afiliadoId=${usuario.afiliado.codigos[0]}`}
                />
                <SharedLink
                  label="Indicação para novos embaixadores"
                  url={`${process.env.NEXT_PUBLIC_ECOMMERCE_URL}/seja-um-embaixador?afiliadoId=${usuario.afiliado.codigos[0]}`}
                />
              </div>
              <div>
                <Link href="/ecommerce/links">
                  <Button color="white">
                    Confira aqui outros links de divulgação
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Alert.Root type="warning">
                <Alert.Message message="Erro ao consultar seus links de afiliado" />
                <Alert.Description>
                  Verifique se você possui perfil de afiliado, e que possui
                  códigos de afiliado cadastrado.
                </Alert.Description>
              </Alert.Root>
            </>
          )}
        </div>
        <figure className="w-[25%] p-4">
          <Image src={mobileShoppingIcon} width={1200} height={1800} alt="" />
        </figure>
      </div>
    </div>
  );
}
