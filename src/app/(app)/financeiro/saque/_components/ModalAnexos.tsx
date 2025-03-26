'use client';
import { filesize } from 'filesize';
import { CloudDownload, Paperclip } from 'lucide-react';
import { Button, Modal, Table } from '@/components';
import { useCallback } from 'react';
import axios from 'axios';

type AnexoProps = {
  id: string;
  filetype: string;
  original_filename: string;
  size: number;
  tipo: {
    id: number;
    nome: string;
  };
};

interface ModalAnexosProps {
  anexos: AnexoProps[];
}

export function ModalAnexos({ anexos }: ModalAnexosProps) {
  const handleDownloadFile = useCallback(async (arquivoId: string) => {
    const url = await axios
      .get(`/api/arquivo/${arquivoId}/download`)
      .then((response) => {
        return response.data.url;
      });

    window.open(url, '_blank');
  }, []);
  return (
    <Modal.Root>
      <Modal.Trigger id="anexos">
        <Button className="h-[28px] w-[28px] p-0" title="Visualizar anexos">
          <Paperclip size={16} />
        </Button>
      </Modal.Trigger>
      <Modal.Container>
        <Modal.Header title="Arquivos do lançamento" />
        <Modal.Body>
          {anexos.length > 0 ? (
            <Table.Root>
              <Table.Head>
                <Table.Row>
                  <Table.Header>Arquivo</Table.Header>
                  <Table.Header>Tipo</Table.Header>
                  <Table.Header>Tamanho</Table.Header>
                  <Table.Header>&nbsp;</Table.Header>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {anexos.map((anexo) => (
                  <Table.Row key={anexo.id}>
                    <Table.Cell>{anexo.original_filename}</Table.Cell>
                    <Table.Cell>{anexo.tipo.nome}</Table.Cell>
                    <Table.Cell>{filesize(anexo.size)}</Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-end">
                        <Button
                          className="h-[28px] w-[28px] p-0"
                          title="Visualizar anexos"
                          onClick={() => handleDownloadFile(anexo.id)}
                        >
                          <CloudDownload size={16} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <p>Nenhum anexo encontrado.</p>
          )}
        </Modal.Body>
      </Modal.Container>
    </Modal.Root>
  );
}
