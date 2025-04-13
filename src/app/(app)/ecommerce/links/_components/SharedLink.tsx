import { CSSProperties, useCallback, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Copy } from 'lucide-react';
import { ArrowSquareOut, Ruler } from '@phosphor-icons/react/dist/ssr';
import { Button, Dialog } from '@/components';

import defaultIcon from '@/assets/images/icons/http.png';

type SharedLinkProps = {
  thumbnail?: StaticImageData | string;
  thumbnailFill?: boolean;
  thumbnailStyle?: CSSProperties;
  label?: string;
  url?: string;
  bgColor?: string;
};

export function SharedLink({
  thumbnail,
  thumbnailFill = false,
  thumbnailStyle = {},
  label,
  url,
  bgColor,
}: SharedLinkProps) {
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
