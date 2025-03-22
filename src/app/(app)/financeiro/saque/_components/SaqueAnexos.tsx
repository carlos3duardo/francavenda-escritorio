import { useCallback, useState } from 'react';
import { Trash } from 'lucide-react';
import { filesize } from 'filesize';
import { Button, Dialog, Modal, Table } from '@/components';

type AnexoProps = {
  id: string;
  filename: string;
  original_filename: string;
  size: number;
  filetype: string;
  tipo: {
    id: string;
    nome: string;
  };
};

interface SaqueAnexosProps {
  anexos: AnexoProps[];
}

export function SaqueAnexos({ anexos }: SaqueAnexosProps) {
  const [arquivos, setArquivos] = useState(anexos);

  const handleDeleteFile = useCallback(
    (id: string) => {
      const arquivo = arquivos.find((arquivo) => arquivo.id === id);

      Dialog.ConfirmDelete.fire({
        title: 'Excluir arquivo',
        text: `Tem certeza que deseja excluir o arquivo ${arquivo?.original_filename}?`,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          setArquivos(arquivos.filter((arquivo) => arquivo.id !== id));
        }
      });
    },
    [arquivos],
  );
  return (
    <div>
      <Modal.Header title="Anexos do lançamento" />
      <Modal.Body>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.Header>Arquivo</Table.Header>
              <Table.Header className="text-right">Tamanho</Table.Header>
              <Table.Header>Tipo</Table.Header>
              <Table.Header>&nbsp;</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {arquivos.length > 0 ? (
              arquivos.map((arquivo) => (
                <Table.Row key={arquivo.id}>
                  <Table.Cell>{arquivo.original_filename}</Table.Cell>
                  <Table.Cell className="text-right">
                    {filesize(arquivo.size)}
                  </Table.Cell>
                  <Table.Cell>{arquivo.tipo.nome}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center justify-end">
                      <Button
                        color="danger"
                        className="h-[28px] w-[28px] p-0"
                        title="Excluir arquivo"
                        onClick={() => handleDeleteFile(arquivo.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={4}>Nenhum anexo</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Modal.Body>
    </div>
  );
}
