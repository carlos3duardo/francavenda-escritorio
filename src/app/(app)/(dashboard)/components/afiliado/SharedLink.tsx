'use client';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Copy } from 'lucide-react';
import { ArrowSquareOut, Ruler } from '@phosphor-icons/react/dist/ssr';
import { Button, Dialog } from '@/components';

import { twMerge } from 'tailwind-merge';

type SharedLinkProps = {
  label?: string;
  url?: string;
  bgColor?: string;
  className?: string;
};

export function SharedLink({ label, url, className }: SharedLinkProps) {
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
    <div className={twMerge('flex items-start gap-2 xl:gap-4', className)}>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex flex-col gap-1 justify-end">
          <h3 className="text-sm font-medium">
            {label || 'Descrição do link'}
          </h3>
          <input
            type="text"
            value={customUrl || process.env.NEXT_PUBLIC_ECOMMERCE_URL}
            className="w-full text-sm h-8 px-2 rounded-sm bg-white dark:bg-primary-950 flex items-center focus:outline-none focus:ring-1 focus:ring-slate-400"
            readOnly
          />
        </div>
        <footer className="flex gap-2">
          <Button
            color="primary"
            size="sm"
            onClick={() => copyUrlToClipboard(customUrl)}
          >
            <Copy size={16} />
            Copiar
          </Button>
          <Button color="primary" size="sm" onClick={() => openUrl(customUrl)}>
            <ArrowSquareOut size={16} />
            Abrir
          </Button>
          <Button
            color="primary"
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
