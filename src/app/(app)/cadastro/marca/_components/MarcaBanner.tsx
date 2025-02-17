'use client';
import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Button, Loader } from '@/components';
import defaultImageUrl from '@/assets/images/marca-logotipo-placeholder.png';

type HttpResponseProps = {
  message: string;
  data: {
    id: string;
    url: string;
    filetype: string;
    size: number;
  };
};

interface MarcaBannerProps {
  marcaId: string;
  marcaCor?: string | null;
  bannerUrl?: string | null;
}

export function MarcaBanner({
  marcaId,
  marcaCor,
  bannerUrl,
}: MarcaBannerProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerUrlState, setBannerUrlState] = useState(bannerUrl);

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
        `/api/marca/${marcaId}/banner`,
        { banner: file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(async (response) => {
        const { data }: HttpResponseProps = response.data;

        setBannerUrlState(data.url);

        await queryClient.refetchQueries({
          queryKey: ['marca', marcaId],
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
      <p>Banner</p>
      <figure
        className="w-full flex items-center justify-center rounded py-8 px-12 relative"
        style={{ backgroundColor: marcaCor || '#454545' }}
      >
        {isSubmitting && (
          <div
            className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center rounded opacity-80"
            style={{ backgroundColor: marcaCor || '#454545' }}
          >
            <Loader.Basic />
          </div>
        )}
        <Image
          src={bannerUrlState || defaultImageUrl}
          width={600}
          height={200}
          alt="Banner"
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
      </figure>
      <div>
        <Button size="sm" color="default" onClick={handleUploadClick}>
          Atualizar Banner
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
