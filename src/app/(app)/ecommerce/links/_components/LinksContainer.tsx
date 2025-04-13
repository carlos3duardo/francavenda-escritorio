'use client';
import { ChangeEvent, useCallback, useState } from 'react';
import { Card } from '@/components';
import { ApiMarcaProps, ApiOfertaProps } from '@/types';
import { useMarcaList, useOfertaList } from '@/hooks';

import ecommerceIcon from '@/assets/images/icons/online-shop.png';
import embaixadorIcon from '@/assets/images/icons/followers.png';
import { SelectCodigoAfiliado } from './SelectCodigoAfiliado';
import { SelectMarca } from './SelectMarca';
import { SharedLink } from './SharedLink';

interface LinksContainerProps {
  afiliadoId: string;
  codigos: string[];
}

export function LinksContainer({ afiliadoId, codigos }: LinksContainerProps) {
  const [codigo, setCodigo] = useState<string>(() =>
    codigos.length ? codigos[0] : '',
  );
  const [marca, setMarca] = useState<ApiMarcaProps | undefined>(undefined);
  const [ofertasMarca, setOfertasMarca] = useState<ApiOfertaProps[]>([]);
  const { data: marcas } = useMarcaList();
  const { data: ofertas } = useOfertaList({});

  const handleChangeMarca = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const marca = marcas?.find((m) => m.slug === e.target.value);

      setMarca(marca);

      if (ofertas) {
        setOfertasMarca(
          ofertas?.filter((oferta) => oferta.produto.marca.id === marca?.id) ||
            [],
        );
      }
    },
    [marcas, ofertas],
  );

  return (
    <Card.Root>
      <Card.Header>
        <Card.HeaderSection className="w-full">
          <div className="w-full flex flex-col gap-2">
            <SelectCodigoAfiliado codigos={codigos} onChange={setCodigo} />
            <SelectMarca marcas={marcas} onChange={handleChangeMarca} />
          </div>
        </Card.HeaderSection>
      </Card.Header>
      <Card.Separator />
      <Card.Body>
        <div className="grid grid-cols-2 gap-4 xl:gap-6">
          <div className="col-span-1">
            <SharedLink
              label="Link de divulgação do seu e-commerce"
              thumbnail={ecommerceIcon}
              url={`${process.env.NEXT_PUBLIC_ECOMMERCE_URL}?afiliadoId=${codigo}`}
              bgColor="#f8ce2b"
            />
          </div>
          <div className="col-span-1">
            <SharedLink
              label="Indicação para novos embaixadores"
              thumbnail={embaixadorIcon}
              url={`${process.env.NEXT_PUBLIC_ECOMMERCE_URL}/seja-um-embaixador?afiliadoId=${codigo}`}
              bgColor="#f8ce2b"
            />
          </div>
        </div>
      </Card.Body>

      {marcas && marcas.length > 0 && (
        <>
          <Card.Separator />
          <Card.Body>
            {marca && (
              <div className="grid grid-cols-2 gap-4 xl:gap-6">
                <div className="col-span-1">
                  <SharedLink
                    label="Link para visualizar todas as ofertas da marca"
                    thumbnail={
                      marca.logotipo_url ? marca.logotipo_url : ecommerceIcon
                    }
                    url={`${process.env.NEXT_PUBLIC_ECOMMERCE_URL}/${marca.slug}?afiliadoId=${codigo}`}
                    bgColor={marca.cor}
                  />
                </div>

                {ofertasMarca.length > 0 &&
                  ofertasMarca.map((oferta) => (
                    <div key={oferta.id} className="col-span-1">
                      <SharedLink
                        label={`Link de divulgação da oferta ${oferta.nome}`}
                        thumbnail={
                          oferta.imagem_url
                            ? oferta.imagem_url
                            : marca.logotipo_url
                              ? marca.logotipo_url
                              : ecommerceIcon
                        }
                        thumbnailFill={true}
                        thumbnailStyle={{
                          objectFit: 'cover',
                          borderRadius: '0.25rem',
                        }}
                        url={`${process.env.NEXT_PUBLIC_ECOMMERCE_URL}/${marca.slug}/${oferta.slug}?afiliadoId=${codigo}`}
                        bgColor={marca.cor}
                      />
                    </div>
                  ))}
              </div>
            )}
          </Card.Body>
        </>
      )}
    </Card.Root>
  );
}
