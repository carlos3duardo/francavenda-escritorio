'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { KeyRound, UserCircle } from 'lucide-react';
import axios from 'axios';
import { Button, Dialog, Form } from '@/components';
import { PasswordValidator } from './PasswordValidator';

export default function FormRedefinirSenha() {
  const searchParams = useSearchParams();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  const formSchema = z.object({
    username: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .email({ message: 'Endereço de e-mail inválido.' }),
    new_password: z.string().min(1, { message: 'Campo obrigatório.' }),
    new_password_confirm: z.string().min(1, { message: 'Campo obrigatório.' }),
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
    const token = searchParams.get('token');
    await axios
      .post('/api/redefinir-senha', {
        token,
        username: data.username,
        new_password: data.new_password,
        new_password_confirm: data.new_password_confirm,
      })
      .then(() => {
        Dialog.Success.fire({
          title: 'Senha redefinida com sucesso.',
          text: 'Você já pode acessar o sistema através de sua nova senha.',
          confirmButtonText: 'Voltar ao início',
        }).then(() => {
          router.push('/entrar');
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
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

            <Form.Control
              label="Sua nova senha"
              className="col-span-12"
              error={errors.new_password?.message}
            >
              <Form.InputPassword
                id="new_password"
                name="new_password"
                icon={KeyRound}
                error={errors.new_password?.message}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
            </Form.Control>

            <Form.Control
              label="Confirme a sua nova senha"
              className="col-span-12"
              error={errors.new_password_confirm?.message}
            >
              <Form.InputPassword
                id="new_password_confirm"
                name="new_password_confirm"
                icon={KeyRound}
                error={errors.new_password_confirm?.message}
              />
            </Form.Control>

            <Form.Control>
              <PasswordValidator
                password={password}
                onValidChange={setIsValidPassword}
              />
            </Form.Control>
          </Form.Fieldset>

          <Form.Error />

          <Form.Footer className="p-0 xl:px-0">
            <Form.FooterSection>
              <div className="w-full flex flex-col gap-2">
                <Form.Submit
                  disabled={!isValidPassword}
                  color="primary"
                  iconSide="right"
                  fullWidth
                >
                  Redefinir senha
                </Form.Submit>

                <Link href="/entrar">
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
