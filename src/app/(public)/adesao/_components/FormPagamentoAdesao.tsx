'use client';
import axios from 'axios';
import * as z from 'zod';
import { Form } from '@/components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';

export function FormPagamentoAdesao() {
  const params = useParams<{ id: string }>();
  const adesaoId = params.id;

  const formSchema = z.object({
    portador: z
      .string()
      .min(1, { message: 'O nome do portador é obrigatório.' }),
    numero: z
      .string()
      .min(1, { message: 'O número do cartão é obrigatório.' })
      .transform((value) => {
        return value.replace(/\D/g, '');
      }),
    validade: z.string().min(1, { message: 'A validade é obrigatória.' }),
    cvv: z.string().min(1, { message: 'O CVV é obrigatório.' }),
  });

  type FormData = z.infer<typeof formSchema>;

  async function submitForm(formData: FormData) {
    await axios
      .post(`/api/ecomm/afiliado/adesao/${adesaoId}`, formData)
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portador: '',
      numero: '',
      validade: '',
      cvv: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;

  return (
    <div className="w-full">
      <Form.Root {...formMethods}>
        <Form.Body onSubmit={handleSubmit(submitForm)} className="pt-0">
          <Form.Fieldset layout="grid" className="px-0 xl:px-0 py-4">
            <Form.Control
              htmlFor="portador"
              label="Nome do portador"
              className="col-span-12"
              error={errors.portador?.message}
            >
              <Form.InputText
                id="portador"
                name="portador"
                placeholder="Nome impresso no cartão"
                uppercase
                autoComplete="off"
              />
            </Form.Control>
            <Form.Control
              htmlFor="numero"
              label="Número do cartão"
              className="col-span-12"
              error={errors.numero?.message}
            >
              <Form.MaskInput
                mask="9999 9999 9999 9999"
                id="numero"
                name="numero"
                placeholder="9999 9999 9999 9999"
              />
            </Form.Control>
            <Form.Control
              htmlFor="validade"
              label="Validade (mês/ano)"
              className="col-span-6"
              error={errors.validade?.message}
            >
              <Form.MaskInput
                mask="99/99"
                id="validade"
                name="validade"
                placeholder="MM/AA"
              />
            </Form.Control>
            <Form.Control
              htmlFor="cvv"
              label="Cód. Segurança"
              className="col-span-6"
              error={errors.cvv?.message}
            >
              <Form.InputText id="cvv" name="cvv" placeholder="999" />
            </Form.Control>
            <Form.Control className="col-span-12">
              <Form.Submit fullWidth>Confirmar pagamento</Form.Submit>
            </Form.Control>
          </Form.Fieldset>
        </Form.Body>
      </Form.Root>
    </div>
  );
}
