'use client';
import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Button, Loader } from '@/components';
import defaultImageUrl from '@/assets/images/fornecedor-logotipo-placeholder.png';

type HttpResponseProps = {
  message: string;
  data: {
    id: string;
    url: string;
    filetype: string;
    size: number;
  };
};

interface FornecedorLogotipoProps {
  fornecedorId: string;
  logotipoUrl?: string | null;
}

export function FornecedorLogotipo({
  fornecedorId,
  logotipoUrl,
}: FornecedorLogotipoProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logotipoUrlState, setLogotipoUrlState] = useState(logotipoUrl);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click();
  };

  const handleFileChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files || !evt.target.files.length) {
      return;
    }

    const file = evt.target.files[0];

    // Não pode ultrapassar 512kb

    if (file.size > 1024 * 512) {
      toast.error('A imagem nao pode ultrapassar 512kb');
      return;
    }

    setIsSubmitting(true);

    await axios
      .post(
        `/api/fornecedor/${fornecedorId}/logotipo`,
        { logotipo: file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(async (response) => {
        const { data }: HttpResponseProps = response.data;

        setLogotipoUrlState(data.url);

        await queryClient.refetchQueries({
          queryKey: ['fornecedor', fornecedorId],
          exact: false,
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <figure className="w-full flex items-center justify-center rounded py-8 px-12 relative">
        {isSubmitting && (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center rounded bg-white dark:bg-black opacity-80">
            <Loader.Basic />
          </div>
        )}
        <Image
          src={logotipoUrlState || defaultImageUrl}
          width={200}
          height={260}
          alt="Logotipo"
          priority
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
      </figure>
      <div>
        <Button size="sm" color="default" onClick={handleUploadClick}>
          Atualizar logotipo
        </Button>
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}
