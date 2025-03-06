import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Dialog, Form, Modal } from '@/components';

import { ModalContext } from '@/components/Modal/ModalContext';

interface ComponentProps {
  adesaoId: string;
}

export function AdesaoFormularioPagamento({ adesaoId }: ComponentProps) {
  const queryClient = useQueryClient();
  const { closeModal } = useContext(ModalContext);

  const formSchema = z.object({
    numero: z.string().min(1, { message: 'O número do cartão é obrigatório.' }),
    portador: z
      .string()
      .min(1, { message: 'O nome do portador é obrigatório.' }),
    validade: z.string().min(1, { message: 'O vencimento é obrigatório.' }),
    cvv: z.string().min(1, { message: 'O CVV é obrigatório.' }),
  });

  type FormData = z.infer<typeof formSchema>;

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  async function formSubmit(data: FormData) {
    try {
      await axios({
        method: 'POST',
        url: `/api/me/adesao/${adesaoId}/pagamento`,
        data: {
          cartao: data,
        },
      }).then(async () => {
        toast.success('Pagamento realizado com sucesso!');
        closeModal();

        await queryClient.refetchQueries({
          queryKey: ['adesao'],
          exact: false,
        });
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        Dialog.Error.fire({
          title: error.response?.data.message,
          text: error.response?.data.description,
          confirmButtonText: 'Fechar',
        });

        return;
      }

      Dialog.Error.fire({
        title: 'Erro ao enviar informações',
        text: 'Tente novamente. Se persistir, entre em contato com o suporte.',
        confirmButtonText: 'Fechar',
      });
    }
  }

  return (
    <div>
      <Modal.Header title="Pagamento da adesão" />
      <Modal.Body>
        <Form.Root {...methods}>
          <Form.Body onSubmit={handleSubmit(formSubmit)}>
            <Form.Fieldset className="p-0 xl:p-0">
              <Form.Control
                label="Número do cartão"
                className="col-span-12"
                error={errors.numero?.message}
              >
                <Form.InputText
                  id="numero"
                  name="numero"
                  error={errors.numero?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="Nome do portador (como impresso no cartão)"
                className="col-span-12"
                error={errors.portador?.message}
              >
                <Form.InputText
                  id="portador"
                  name="portador"
                  error={errors.portador?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="Validade"
                className="col-span-12 md:col-span-6"
                error={errors.validade?.message}
              >
                <Form.MaskInput
                  id="validade"
                  name="validade"
                  mask="99/99"
                  error={errors.validade?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="Código de segurança"
                className="col-span-12 md:col-span-6"
                error={errors.cvv?.message}
              >
                <Form.InputText
                  id="cvv"
                  name="cvv"
                  error={errors.cvv?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control className="col-span-12">
                <Form.Submit fullWidth>Realizar pagamento</Form.Submit>
              </Form.Control>
            </Form.Fieldset>
          </Form.Body>
        </Form.Root>
      </Modal.Body>
    </div>
  );
}
