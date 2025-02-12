'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRight, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Dialog, Form } from '@/components';
import Link from 'next/link';

export default function FormEsqueciMinhaSenha() {
  const router = useRouter();

  const formSchema = z.object({
    username: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .email({ message: 'Endereço de e-mail inválido.' }),
  });

  type FormData = z.infer<typeof formSchema>;

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  async function formSubmit(data: FormData) {
    await axios
      .post('/api/esqueci-minha-senha', {
        username: data.username,
      })
      .then((response) => {
        Dialog.Success.fire({
          title: 'Solicitação enviada com sucesso.',
          text: 'Verifique seu e-mail e siga as instruções para redefinir sua senha.',
          confirmButtonText: 'Voltar ao início',
        }).then(() => {
          router.push('/');
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          const error = err.response.data;

          setError('root.serverError', {
            message: error.message,
          });
        } else {
          setError('root.serverError', {
            message:
              'Não foi possível realizar a autenticação. Tente novamente. Se persistir, entre em contato com o suporte.',
          });
        }
      });
  }

  return (
    <div className="w-full lg:max-w-[380px] px-4 lg:px-0 flex flex-col items-center gap-4">
      <Form.Root {...methods}>
        <Form.Body onSubmit={handleSubmit(formSubmit)}>
          <Form.Fieldset className="px-0 xl:px-0">
            <Form.Control
              label="Seu e-mail"
              className="col-span-12"
              error={errors.username?.message}
            >
              <Form.InputText
                id="username"
                name="username"
                icon={UserCircle}
                error={errors.username?.message}
              />
            </Form.Control>
          </Form.Fieldset>

          <Form.Error />

          <Form.Footer className="p-0 xl:px-0">
            <Form.FooterSection>
              <div className="w-full flex flex-col gap-2">
                <Form.Submit
                  color="primary"
                  icon={ArrowRight}
                  iconSide="right"
                  fullWidth
                >
                  Solicitar código
                </Form.Submit>

                <Link href="/sign-in">
                  <Button
                    color="primary"
                    variant="outline"
                    iconSide="left"
                    fullWidth
                  >
                    Voltar
                  </Button>
                </Link>
              </div>
            </Form.FooterSection>
          </Form.Footer>
        </Form.Body>
      </Form.Root>
    </div>
  );
}
