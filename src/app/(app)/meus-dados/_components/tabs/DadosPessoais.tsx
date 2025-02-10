'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { isDate } from 'brazilian-values';
import { Form } from '@/components';
import { dateBr, maskCpf, maskTelefone } from '@/helpers';
import { useSexoList } from '@/hooks';
import { UserAvatar } from '../UserAvatar';
import { toast } from 'react-toastify';

type SelectOptionProps = {
  value: string;
  label: string;
};

export function DadosPessoais() {
  const { data: sexos } = useSexoList();
  const [optMunicipio, setOptMunicipio] = useState<SelectOptionProps[]>([]);

  const schema = z.object({
    nome: z
      .string()
      .trim()
      .min(10, { message: 'O nome deve ter pelo menos 10 caracteres.' })
      .max(128, { message: 'O nome deve ter no máximo 128 caracteres.' }),
    apelido: z
      .string()
      .trim()
      .min(3, { message: 'O apelido deve ter pelo menos 3 caracteres.' })
      .max(64, { message: 'O apelido deve ter no máximo 64 caracteres.' }),
    email: z
      .string()
      .trim()
      .email({ message: 'O email deve ser um endereço de e-mail válido.' }),
    celular: z
      .string()
      .trim()
      .min(11, { message: 'O celular deve ter pelo menos 11 caracteres.' })
      .max(15, { message: 'O celular deve ter no máximo 15 caracteres.' }),
    cpf: z
      .string()
      .trim()
      .max(32, { message: 'CPF inválido.' })
      .or(z.literal('')),
    rg: z
      .string()
      .trim()
      .max(32, { message: 'O RG deve ter no máximo 32 caracteres.' })
      .or(z.literal('')),
    rg_emissor: z
      .string()
      .trim()
      .max(32, { message: 'O emissor do RG deve ter no máximo 32 caracteres.' })
      .or(z.literal('')),
    naturalidade_id: z.string().trim().or(z.literal('')),
    mae: z
      .string()
      .trim()
      .min(3, { message: 'O apelido deve ter pelo menos 3 caracteres.' })
      .max(64, { message: 'O apelido deve ter no máximo 64 caracteres.' })
      .or(z.literal('')),
    sexo_id: z.number().or(z.literal('')),
    nascimento: z
      .string()
      .trim()
      .or(z.literal(''))
      .refine((value) => isDate(value))
      .transform((value) => {
        const [day, month, year] = value.split('/');
        return `${year}-${month}-${day}`;
      }),
  });

  type FormData = z.infer<typeof schema>;

  const formMethods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      return fetch('/api/me')
        .then((res) => res.json())
        .then((data) => {
          if (data.naturalidade) {
            setOptMunicipio([
              {
                value: data.naturalidade.id.toString(),
                label: `${data.naturalidade.municipio} - ${data.naturalidade.uf}`,
              },
            ]);
          }
          return {
            nome: data.nome,
            apelido: data.apelido,
            email: data.email,
            celular: data.celular ? maskTelefone(data.celular) : '',
            cpf: data.cpf ? maskCpf(data.cpf) : '',
            rg: data.rg,
            rg_emissor: data.rg_emissor,
            naturalidade_id: data.naturalidade.id.toString(),
            mae: data.mae,
            sexo_id: data.sexo?.id,
            nascimento: data.nascimento ? dateBr(data.nascimento) : '',
          };
        });
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;

  async function submitForm(formData: FormData) {
    console.log(formData);

    await axios.put('/api/me', formData).then((res) => {
      toast.success('Dados atualizados com sucesso!');
    });
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      <aside className="w-full lg:w-[160px] xl:w-[160px] 2xl:w-[240px]">
        <UserAvatar />
      </aside>
      <div className="flex-grow">
        <Form.Root {...formMethods}>
          <Form.Body onSubmit={handleSubmit(submitForm)}>
            <Form.Fieldset>
              <Form.Control
                label="Nome completo"
                error={errors.nome?.message}
                className="2xl:col-span-7"
              >
                <Form.InputText
                  id="nome"
                  name="nome"
                  error={errors.nome?.message}
                />
              </Form.Control>

              <Form.Control
                label="Apelido"
                error={errors.apelido?.message}
                className="2xl:col-span-5"
              >
                <Form.InputText
                  id="apelido"
                  name="apelido"
                  error={errors.apelido?.message}
                />
              </Form.Control>
              <Form.Control
                label="E-mail"
                error={errors.email?.message}
                className="xl:col-span-7"
              >
                <Form.InputText
                  id="email"
                  name="email"
                  error={errors.email?.message}
                />
              </Form.Control>
              <Form.Control
                label="Celular"
                error={errors.celular?.message}
                className="xl:col-span-5"
              >
                <Form.TelefoneInput
                  id="celular"
                  name="celular"
                  error={errors.celular?.message}
                />
              </Form.Control>
              <Form.Control label="Nome da mãe" error={errors.mae?.message}>
                <Form.InputText
                  id="mae"
                  name="mae"
                  error={errors.mae?.message}
                />
              </Form.Control>

              <Form.Control
                label="CPF"
                error={errors.cpf?.message}
                className="xl:col-span-4"
              >
                <Form.MaskInput
                  mask="999.999.999-99"
                  id="cpf"
                  name="cpf"
                  error={errors.cpf?.message}
                />
              </Form.Control>
              <Form.Control
                label="RG"
                error={errors.rg?.message}
                className="xl:col-span-4"
              >
                <Form.InputText id="rg" name="rg" error={errors.rg?.message} />
              </Form.Control>
              <Form.Control
                label="Emissor RG"
                error={errors.rg_emissor?.message}
                className="xl:col-span-4"
              >
                <Form.InputText
                  id="rg_emissor"
                  name="rg_emissor"
                  error={errors.rg_emissor?.message}
                />
              </Form.Control>

              <Form.Control
                label="Naturalidade"
                error={errors.naturalidade_id?.message}
                className="xl:col-span-4"
              >
                <Form.AsyncSelect
                  id="naturalidade_id"
                  name="naturalidade_id"
                  sourceUrl="/api/select-options/municipio"
                  defaultOptions={optMunicipio}
                />
              </Form.Control>
              <Form.Control
                label="Sexo"
                error={errors.sexo_id?.message}
                className="xl:col-span-4"
              >
                {sexos && (
                  <Form.Select
                    id="sexo_id"
                    name="sexo_id"
                    options={sexos.map((sexo) => ({
                      value: sexo.id.toString(),
                      label: sexo.nome,
                    }))}
                    valueAsNumber={true}
                  />
                )}
              </Form.Control>

              <Form.Control
                label="Nascimento"
                error={errors.nascimento?.message}
                className="xl:col-span-4"
              >
                <Form.MaskInput
                  mask="99/99/9999"
                  id="nascimento"
                  name="nascimento"
                  error={errors.nascimento?.message}
                />
              </Form.Control>
            </Form.Fieldset>
            <Form.Separator />
            <Form.Footer>
              <Form.Submit>Atualizar dados</Form.Submit>
            </Form.Footer>
          </Form.Body>
        </Form.Root>
      </div>
    </div>
  );
}
