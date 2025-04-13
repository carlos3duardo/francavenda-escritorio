'use client';
import {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowSquareOut, Copy, Ruler } from '@phosphor-icons/react/dist/ssr';
import { toast } from 'react-toastify';
import { Button, Card, Dialog, Select } from '@/components';
import { ApiMarcaProps, ApiOfertaProps } from '@/types';
import { useMarcaList, useOfertaList } from '@/hooks';

import ecommerceIcon from '@/assets/images/icons/online-shop.png';
import embaixadorIcon from '@/assets/images/icons/followers.png';
import defaultIcon from '@/assets/images/icons/http.png';
import axios from 'axios';

interface LinksContainerProps {
  afiliadoId: string;
  codigos: string[];
}

type LinkContainerProps = {
  thumbnail?: StaticImageData | string;
  thumbnailFill?: boolean;
  thumbnailStyle?: CSSProperties;
  label?: string;
  url?: string;
  bgColor?: string;
};

function LinkContainer({
  thumbnail,
  thumbnailFill = false,
  thumbnailStyle = {},
  label,
  url,
  bgColor,
}: LinkContainerProps) {
  const [isShortenerProcessing, setIsShortenerProcessing] = useState(false);
  const [customUrl, setCustomUrl] = useState<string>('');

  function copyUrlToClipboard(value: string) {
    navigator.clipboard.writeText(value || '');

    toast.success('Link copiado com sucesso!', {
      position: 'top-center',
      autoClose: 2000,
    });
  }

  function openUrl(value: string) {
    window.open(value, '_blank');
  }

  const shortenUrl = useCallback(async (url: string) => {
    setIsShortenerProcessing(true);

    await axios
      .post(
        `https://api.tinyurl.com/create?api_token=${process.env.NEXT_PUBLIC_TINYURL_TOKEN}`,
        {
          url,
        },
      )
      .then((res) => {
        setCustomUrl(res.data.data.tiny_url);
      })
      .catch((err) => {
        console.log({ err });

        Dialog.Error.fire({
          title: 'Erro ao gerar link curto',
          text: 'Verifique o console do navegador para mais detalhes.',
        });
      })
      .finally(() => {
        setIsShortenerProcessing(false);
      });
  }, []);

  useEffect(() => setCustomUrl(url || ''), [url]);

  return (
    <div className="flex items-start gap-2 xl:gap-4 p-4">
      <figure
        className="flex items-center justify-center h-[72px] w-[72px] rounded relative"
        style={{ backgroundColor: bgColor || 'transparent' }}
      >
        <Image
          src={thumbnail || defaultIcon}
          alt=""
          width={thumbnailFill ? undefined : 64}
          height={thumbnailFill ? undefined : 64}
          fill={thumbnailFill}
          sizes={
            thumbnailFill
              ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              : undefined
          }
          style={thumbnailStyle}
        />
      </figure>
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-[72px] flex flex-col gap-1 justify-end">
          <h3 className="text-sm font-medium">
            {label || 'Descrição do link'}
          </h3>
          <input
            type="text"
            value={customUrl || process.env.NEXT_PUBLIC_ECOMMERCE_URL}
            className="w-full text-sm h-8 px-2 rounded-sm bg-transparent ring-1 ring-slate-300 flex items-center focus:outline-none focus:ring-slate-400"
            readOnly
          />
        </div>
        <footer className="flex gap-2">
          <Button size="sm" onClick={() => copyUrlToClipboard(customUrl)}>
            <Copy size={16} />
            Copiar
          </Button>
          <Button size="sm" onClick={() => openUrl(customUrl)}>
            <ArrowSquareOut size={16} />
            Abrir
          </Button>
          <Button
            size="sm"
            onClick={() => shortenUrl(customUrl || '')}
            isLoading={isShortenerProcessing}
          >
            <Ruler size={16} />
            Encurtar
          </Button>
        </footer>
      </div>
    </div>
  );
}

export function LinksContainer({ afiliadoId, codigos }: LinksContainerProps) {
  const [codigo, setCodigo] = useState<string>(() =>
    codigos.length ? codigos[0] : '',
  );
  const [marca, setMarca] = useState<ApiMarcaProps | undefined>(undefined);
  const [ofertasMarca, setOfertasMarca] = useState<ApiOfertaProps[]>([]);
  const { data: marcas } = useMarcaList();
  const { data: ofertas } = useOfertaList({});

  const handleChangeCodigo = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setCodigo(e.target.value);
    },
    [],
  );

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

  // useEffect(() => {
  //   if (codigos?.length) {
  //     setCodigo(codigos[0]);
  //   }
  // }, [codigos]);

  return (
    <Card.Root>
      <Card.Header>
        <Card.HeaderSection>
          <div className="flex flex-col gap-0.5 xl:flex-row xl:gap-4 xl:items-center">
            <label htmlFor="codigo" className="text-sm whitespace-nowrap">
              Seu código de afiliado:
            </label>
            <div className="w-full min-w-[200px]">
              <Select
                id="codigo"
                options={codigos?.map((c) => ({ label: c, value: c }))}
                defaultValue={codigo}
                onChange={handleChangeCodigo}
              />
            </div>
          </div>
        </Card.HeaderSection>
      </Card.Header>
      <Card.Separator />
      <Card.Body>
        <div className="grid grid-cols-2 gap-4 xl:gap-6">
          <div className="col-span-1">
            <LinkContainer
              label="Link de divulgação do seu e-commerce"
              thumbnail={ecommerceIcon}
              url={`${process.env.NEXT_PUBLIC_ECOMMERCE_URL}?afiliadoId=${codigo}`}
              bgColor="#f8ce2b"
            />
          </div>
          <div className="col-span-1">
            <LinkContainer
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
            <div>
              <div className="flex flex-col gap-0.5 xl:flex-row xl:gap-4 xl:items-center">
                <label htmlFor="marca_id" className="text-sm whitespace-nowrap">
                  Selecione a marca para visualizar os links das ofertas
                </label>
                <div className="">
                  <Select
                    id="marca_id"
                    placeholder="Selecione"
                    options={marcas
                      ?.filter((m) => m.ativa === true)
                      .map((marca) => ({
                        value: marca.slug,
                        label: marca.nome,
                      }))}
                    onChange={handleChangeMarca}
                  />
                </div>
              </div>
            </div>

            {marca && (
              <div className="grid grid-cols-2 gap-4 xl:gap-6">
                <div className="col-span-1">
                  <LinkContainer
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
                      <LinkContainer
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
