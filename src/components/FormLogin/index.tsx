'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRight, CircleHelp, KeyRound, UserCircle } from 'lucide-react';
import { Form } from '../Form';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function FormLogin() {
  const router = useRouter();

  const formSchema = z.object({
    username: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .email({ message: 'Endereço de e-mail inválido.' }),
    password: z.string().min(1, { message: 'Campo obrigatório.' }),
    remember: z.boolean(),
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
      .post('/auth/token', {
        username: data.username,
        password: data.password,
        remember: data.remember,
      })
      .then(() => {
        router.push('/');
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
          <Form.Fieldset className="px-0">
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
              label="Sua senha"
              className="col-span-12"
              error={errors.password?.message}
            >
              <Form.InputPassword
                id="password"
                name="password"
                icon={KeyRound}
                error={errors.password?.message}
              />
            </Form.Control>
            <div className="col-span-12 flex items-center justify-between text-sm font-medium">
              <Form.Checkbox
                name="remember"
                label="Lembrar-me"
                error={errors.remember?.message}
              />
              <div>Esqueci minha senha</div>
            </div>
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
                  Entrar
                </Form.Submit>

                <Button
                  color="primary"
                  variant="outline"
                  icon={CircleHelp}
                  iconSide="left"
                  fullWidth
                >
                  Esqueci minha senha
                </Button>
              </div>
            </Form.FooterSection>
          </Form.Footer>
        </Form.Body>
      </Form.Root>
    </div>
  );
}
