'use client';

import Lottie from 'lottie-react';
import { useAfiliadoRedeEmbaixadores } from '@/hooks';
import tableLoading from '@/assets/lotties/table-loading.json';
import avatarPlaceHolder from '@/assets/images/avatar-placeholder.jpg';
import Image from 'next/image';
import { Card } from '@/components';
import { twMerge } from 'tailwind-merge';
import { ArrowDown } from '@phosphor-icons/react/dist/ssr';

interface ComponentProps {
  afiliadoId: string;
}

type PatrocinadorProps = {
  id: string;
  nome: string;
  email: string;
  nivel: number;
  avatar_url: string | null;
};

type CardAfiliadoProps = {
  nome: string;
  email: string;
  avatarUrl: string | null;
  className?: string;
};

function CardAfiliado({
  nome,
  email,
  avatarUrl,
  className,
}: CardAfiliadoProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col lg:flex-row gap-2 xl:gap-4 px-6 py-4 items-center bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white rounded-md',
        className,
      )}
    >
      <figure>
        <Image
          src={avatarUrl || avatarPlaceHolder}
          alt=""
          width={52}
          height={52}
          className="rounded-full"
        />
      </figure>
      <div className="flex flex-col text-center lg:text-left">
        <strong>{nome}</strong>
        <p className="text-sm font-medium">{email}</p>
      </div>
    </div>
  );
}

export function RedeEmbaixadores({ afiliadoId }: ComponentProps) {
  const { data, isLoading } = useAfiliadoRedeEmbaixadores(afiliadoId);

  const patrocinador =
    data && data.patrocinadores
      ? data.patrocinadores.reduce(
          (acc: PatrocinadorProps | null, item: PatrocinadorProps) => {
            if (!acc) {
              return item;
            } else {
              return acc && item.nivel > acc.nivel ? item : acc;
            }
          },
          null,
        )
      : null;

  return (
    <Card.Root>
      {isLoading ? (
        <Card.Body>
          <div>
            <figure className="w-24 h-24 mx-auto">
              <Lottie animationData={tableLoading} />
            </figure>
          </div>
        </Card.Body>
      ) : data ? (
        <Card.Body>
          <div className="flex flex-col gap-4">
            {patrocinador && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 items-center">
                  <h2 className="flex rounded-md bg-emerald-200 dark:bg-emerald-800 px-2 py-1 text-xs font-medium uppercase">
                    Seu patrocinador
                  </h2>
                  <CardAfiliado
                    nome={patrocinador.nome}
                    email={patrocinador.email}
                    avatarUrl={patrocinador.avatar_url}
                    className="bg-emerald-200 dark:bg-emerald-800"
                  />
                  <ArrowDown size={24} weight="bold" className="mt-2" />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 items-center">
                <h2 className="flex rounded-md bg-primary-200 dark:bg-primary-800 px-2 py-1 text-xs font-medium uppercase">
                  Você
                </h2>
                <CardAfiliado
                  nome={data?.afiliado.nome}
                  email={data?.afiliado.email}
                  avatarUrl={data?.afiliado.avatar_url}
                  className="bg-primary-200 dark:bg-primary-800"
                />
                {data.embaixadores.length > 0 && (
                  <ArrowDown size={24} weight="bold" className="mt-2" />
                )}
              </div>
            </div>

            {data.embaixadores.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 items-center">
                  <h2 className="flex rounded-md bg-orange-200 dark:bg-orange-800 px-2 py-1 text-xs font-medium uppercase">
                    Seus embaixadores
                  </h2>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {data.embaixadores.map((embaixador) => (
                      <CardAfiliado
                        key={embaixador.id}
                        nome={embaixador.nome}
                        email={embaixador.email}
                        avatarUrl={embaixador.avatar_url}
                        className="bg-orange-200 dark:bg-orange-800"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      ) : (
        <Card.Body>Erro</Card.Body>
      )}
    </Card.Root>
  );
}
