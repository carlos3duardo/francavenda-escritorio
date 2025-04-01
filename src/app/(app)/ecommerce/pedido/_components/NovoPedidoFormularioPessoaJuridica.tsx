import { Card, Form, InputSkeleton } from '@/components';
import { useAfiliadoList, useUfList } from '@/hooks';
import { useEmpresaTipoList } from '@/hooks/useEmpresaTipoList';
import { ApiOfertaProps, UserCookieProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { getCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface FormularioProps {
  oferta: ApiOfertaProps;
}

export function NovoPedidoFormularioPessoaJuridica({
  oferta,
}: FormularioProps) {
  const router = useRouter();

  const { data: tipos, isLoading: isLoadingTipos } = useEmpresaTipoList();
  const { data: ufs, isLoading: isLoadingUfs } = useUfList();
  const afiliados = useAfiliadoList();

  const formSchema = z.object({
    afiliado_id: z.string().uuid().or(z.literal('')),
    produto_id: z.string().uuid(),
    oferta_id: z.string().uuid(),
    natureza: z.enum(['pf', 'pj']),
    empresa: z.object({
      nome_fantasia: z.string().min(1, { message: 'Campo obrigatório.' }),
      razao_social: z.string().min(1, { message: 'Campo obrigatório.' }),
      tipo_id: z.string().min(1, { message: 'Campo obrigatório' }),
      mei: z.string().min(1, { message: 'Campo obrigatório.' }),
      simples_nacional: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .optional()
        .or(z.literal('')),
      cnpj: z.string().min(1, { message: 'Campo obrigatório.' }),
      ins_municipal: z
        .string()
        .min(1, { message: 'Campo obrigatório' })
        .optional()
        .or(z.literal('')),
      ins_estadual: z
        .string()
        .min(1, { message: 'Campo obrigatório' })
        .optional()
        .or(z.literal('')),
      cep: z.string().min(1, { message: 'Campo obrigatório.' }),
      logradouro: z.string().min(1, { message: 'Campo obrigatório.' }),
      numero: z.string().min(1, { message: 'Campo obrigatório.' }),
      complemento: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .optional()
        .or(z.literal('')),
      bairro: z.string().min(1, { message: 'Campo obrigatório.' }),
      municipio: z.string().min(1, { message: 'Campo obrigatório.' }),
      uf: z.string().min(1, { message: 'Campo obrigatório.' }),
      contato: z.string().min(1, { message: 'Campo obrigatório.' }),
      email: z.string().min(1, { message: 'Campo obrigatório.' }),
      telefone: z.string().min(1, { message: 'Campo obrigatório.' }),
      responsavel: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .optional()
        .or(z.literal('')),
      responsavel_cpf: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .optional()
        .or(z.literal('')),
      comentario: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .optional()
        .or(z.literal('')),
    }),
  });

  type FormData = z.infer<typeof formSchema>;

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const usuario = hasCookie('frv:user')
        ? (JSON.parse(getCookie('frv:user') as string) as UserCookieProps)
        : null;

      return {
        afiliado_id: usuario?.afiliado?.id || '',
        produto_id: oferta.produto.id,
        oferta_id: oferta.id,
        natureza: 'pj',
        empresa: {
          nome_fantasia: '',
          razao_social: '',
          tipo_id: '',
          mei: '',
          simples_nacional: '',
          cnpj: '',
          ins_municipal: '',
          ins_estadual: '',
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          municipio: '',
          uf: '',
          contato: '',
          email: '',
          telefone: '',
          responsavel: '',
          responsavel_cpf: '',
          comentario: '',
        },
      };
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  async function formSubmit(data: FormData) {
    try {
      await axios({
        method: 'post',
        url: '/api/pedido',
        data,
      }).then((response) => {
        toast.success('Empresa cadastrada com sucesso');
        router.push('/ecommerce/pedido');
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card.Root>
      <Card.Header>
        <Card.Label title="Novo pedido | Pessoa Jurídica" />
      </Card.Header>
      <Card.Separator />
      <Card.Body zeroPadding>
        <Form.Root {...methods}>
          <Form.Body onSubmit={handleSubmit(formSubmit)}>
            <Form.Fieldset>
              <Form.Control
                label="Nome fantasia"
                className="col-span-12 lg:col-span-4"
                error={errors.empresa?.nome_fantasia?.message}
              >
                <Form.InputText
                  id="nome_fantasia"
                  name="empresa[nome_fantasia]"
                  error={errors.empresa?.nome_fantasia?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="Razão social"
                className="col-span-12 lg:col-span-5"
                error={errors.empresa?.razao_social?.message}
              >
                <Form.InputText
                  id="razao_social"
                  name="empresa[razao_social]"
                  error={errors.empresa?.razao_social?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="CNPJ"
                className="col-span-12 lg:col-span-3"
                error={errors.empresa?.cnpj?.message}
              >
                <Form.InputText
                  id="cnpj"
                  name="empresa[cnpj]"
                  error={errors.empresa?.cnpj?.message}
                  uppercase
                />
              </Form.Control>

              <Form.Control
                label="Tipo"
                className="col-span-12 lg:col-span-2"
                error={errors.empresa?.tipo_id?.message}
              >
                {isLoadingTipos ? (
                  <InputSkeleton />
                ) : tipos ? (
                  <Form.Select
                    name="empresa[tipo_id]"
                    id="tipo_id"
                    placeholder="Selecione"
                    options={tipos.map((t) => ({
                      value: t.id.toString(),
                      label: t.nome,
                    }))}
                  />
                ) : (
                  <>...</>
                )}
              </Form.Control>

              <Form.Control
                label="MEI"
                className="col-span-12 lg:col-span-2"
                error={errors.empresa?.mei?.message}
              >
                <Form.Select
                  name="empresa[mei]"
                  id="mei"
                  placeholder="Selecione"
                  options={[
                    {
                      value: '1',
                      label: 'Sim',
                    },
                    {
                      value: '0',
                      label: 'Não',
                    },
                  ]}
                />
              </Form.Control>

              <Form.Control
                label="Simples Nacional"
                className="col-span-12 lg:col-span-2"
                error={errors.empresa?.simples_nacional?.message}
              >
                <Form.Select
                  id="simples_nacional"
                  name="empresa[simples_nacional]"
                  placeholder="Selecione"
                  options={[
                    {
                      value: '1',
                      label: 'Optante',
                    },
                    {
                      value: '0',
                      label: 'Não optante',
                    },
                  ]}
                />
              </Form.Control>

              <Form.Control
                label="Inscrição Municipal"
                className="col-span-12 lg:col-span-3"
                error={errors.empresa?.ins_municipal?.message}
              >
                <Form.InputText
                  id="ins_municipal"
                  name="empresa[ins_municipal]"
                  error={errors.empresa?.ins_municipal?.message}
                  uppercase
                />
              </Form.Control>

              <Form.Control
                label="Inscrição Estadual"
                className="col-span-12 lg:col-span-3"
                error={errors.empresa?.ins_estadual?.message}
              >
                <Form.InputText
                  id="ins_estadual"
                  name="empresa[ins_estadual]"
                  error={errors.empresa?.ins_estadual?.message}
                  uppercase
                />
              </Form.Control>
            </Form.Fieldset>
            <Form.Separator />
            <Form.Fieldset>
              <Form.Control
                label="CEP"
                className="col-span-12 lg:col-span-2"
                error={errors.empresa?.cep?.message}
              >
                <Form.InputText
                  id="cep"
                  name="empresa[cep]"
                  error={errors.empresa?.cep?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="Logradouro"
                className="col-span-12 lg:col-span-5"
                error={errors.empresa?.logradouro?.message}
              >
                <Form.InputText
                  id="logradouro"
                  name="empresa[logradouro]"
                  error={errors.empresa?.logradouro?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="Número"
                className="col-span-12 lg:col-span-2"
                error={errors.empresa?.numero?.message}
              >
                <Form.InputText
                  id="numero"
                  name="empresa[numero]"
                  error={errors.empresa?.numero?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="Complemento"
                className="col-span-12 lg:col-span-3"
                error={errors.empresa?.complemento?.message}
              >
                <Form.InputText
                  id="complemento"
                  name="empresa[complemento]"
                  error={errors.empresa?.complemento?.message}
                  uppercase
                />
              </Form.Control>

              <Form.Control
                label="Bairro"
                className="col-span-12 lg:col-span-5"
                error={errors.empresa?.bairro?.message}
              >
                <Form.InputText
                  id="bairro"
                  name="empresa[bairro]"
                  error={errors.empresa?.bairro?.message}
                  uppercase
                />
              </Form.Control>

              <Form.Control
                label="Município"
                className="col-span-12 lg:col-span-4"
                error={errors.empresa?.municipio?.message}
              >
                <Form.InputText
                  id="municipio"
                  name="empresa[municipio]"
                  error={errors.empresa?.municipio?.message}
                  uppercase
                />
              </Form.Control>

              <Form.Control
                label="UF"
                className="col-span-12 lg:col-span-3"
                error={errors.empresa?.uf?.message}
              >
                {isLoadingUfs ? (
                  <InputSkeleton />
                ) : ufs ? (
                  <Form.Select
                    id="uf"
                    name="empresa[uf]"
                    placeholder="Selecione"
                    options={ufs.map((uf) => ({
                      value: uf.sigla,
                      label: uf.sigla,
                    }))}
                  />
                ) : (
                  <>...</>
                )}
              </Form.Control>
            </Form.Fieldset>

            <Form.Separator />

            <Form.Fieldset>
              <Form.Control
                label="Contato"
                className="col-span-12 lg:col-span-5"
                error={errors.empresa?.contato?.message}
              >
                <Form.InputText
                  id="contato"
                  name="empresa[contato]"
                  error={errors.empresa?.contato?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="E-mail"
                className="col-span-12 lg:col-span-4"
                error={errors.empresa?.email?.message}
              >
                <Form.InputText
                  id="email"
                  name="empresa[email]"
                  error={errors.empresa?.email?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="Telefone"
                className="col-span-12 lg:col-span-3"
                error={errors.empresa?.telefone?.message}
              >
                <Form.InputText
                  id="telefone"
                  name="empresa[telefone]"
                  error={errors.empresa?.telefone?.message}
                  uppercase
                />
              </Form.Control>
            </Form.Fieldset>

            <Form.Separator />

            <Form.Fieldset>
              <Form.Control
                label="Responsável jurídico"
                className="col-span-12 lg:col-span-5"
                error={errors.empresa?.responsavel?.message}
              >
                <Form.InputText
                  id="responsavel"
                  name="empresa[responsavel]"
                  error={errors.empresa?.responsavel?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="CPF do responsável"
                className="col-span-12 lg:col-span-4"
                error={errors.empresa?.responsavel_cpf?.message}
              >
                <Form.InputText
                  id="responsavel_cpf"
                  name="empresa[responsavel_cpf]"
                  error={errors.empresa?.responsavel_cpf?.message}
                />
              </Form.Control>

              <Form.Control
                label="Embaixador"
                className="col-span-12 lg:col-span-3"
                error={errors.afiliado_id?.message}
              >
                {afiliados.isLoading ? (
                  <InputSkeleton />
                ) : afiliados.data ? (
                  <Form.Select
                    name="afiliado_id"
                    id="afiliado_id"
                    placeholder="Selecione"
                    options={afiliados.data.map((t) => ({
                      value: t.id,
                      label: t.usuario.apelido || t.usuario.nome,
                    }))}
                  />
                ) : (
                  <>...</>
                )}
              </Form.Control>
            </Form.Fieldset>

            <Form.Separator />

            <Form.Fieldset>
              <Form.Control
                label="Comentário"
                error={errors.empresa?.comentario?.message}
              >
                <Form.Textarea
                  id="comentario"
                  name="empresa[comentario]"
                  error={errors.empresa?.comentario?.message}
                />
              </Form.Control>
            </Form.Fieldset>

            <Form.Separator />

            <Form.Footer>
              <Form.FooterSection>
                <Form.Submit>Cadastrar</Form.Submit>
              </Form.FooterSection>
            </Form.Footer>
          </Form.Body>
        </Form.Root>
      </Card.Body>
    </Card.Root>
  );
}
