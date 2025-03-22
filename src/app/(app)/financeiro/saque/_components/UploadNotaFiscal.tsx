import { Button } from '@/components';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CloudUpload } from 'lucide-react';
import { ChangeEvent, useRef } from 'react';

interface ComponentProps {
  saqueId: string;
}

export function UploadNotaFiscal({ saqueId }: ComponentProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files || !evt.target.files.length) {
      return;
    }

    const file = evt.target.files[0];

    // Não pode ultrapassar 1mb
    if (file.size > 1024 * 1024 * 1) {
      alert('A imagem não pode ultrapassar 512kb.');
      // notification({
      //   type: 'error',
      //   message: 'A imagem não pode ultrapassar 512kb',
      // });

      return;
    }

    axios
      .post(
        `/api/financeiro/saque/${saqueId}/nota-fiscal`,
        { file: evt.target.files[0] },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(async (response) => {
        console.log({ response });
        await queryClient.refetchQueries({
          queryKey: ['historico-saques'],
          exact: false,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Button className="h-[28px] w-[28px] p-0" onClick={handleUploadClick}>
        <CloudUpload size={16} />
      </Button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
}
