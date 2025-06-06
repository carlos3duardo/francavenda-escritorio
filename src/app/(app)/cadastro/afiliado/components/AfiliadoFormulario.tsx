'use client';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiAfiliadoProps } from '@/types';
import { Button, Card, Form } from '@/components';
import { useAfiliadoList, useBancoList, useSexoList } from '@/hooks';
import Link from 'next/link';
import { useServicoAssinaturaList } from '@/hooks/useServicoAssinaturaList';
import { dateBr, maskCpf, maskTelefone } from '@/helpers';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AfiliadoFormularioProps {
  afiliado?: ApiAfiliadoProps | undefined;
}

export function AfiliadoFormulario({ afiliado }: AfiliadoFormularioProps) {
  const router = useRouter();

  const formSchema = z.object({
    usuario: z.object({
      nome: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .max(128, { message: 'Campo não pode ultrapassar 128 caracteres.' }),
      apelido: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .max(64, { message: 'Campo não pode ultrapassar 64 caracteres.' }),
      celular: z.string().min(1, { message: 'Campo obrigatório.' }),
      email: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .email({ message: 'Endereço de e-mail inválido.' }),
      cpf: z.string().min(1, { message: 'Campo obrigatório.' }),
      rg: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .or(z.literal('')),
      rg_emissor: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .or(z.literal('')),
      mae: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .or(z.literal('')),
      sexo_id: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .or(z.literal('')),
      nascimento: z
        .string()
        .min(1, { message: 'Campo obrigatório.' })
        .or(z.literal(''))
        .transform((value) => {
          if (value !== '') {
            const [day, month, year] = value.split('/');
            return `${year}-${month}-${day}`;
          }
        }),
    }),
    patrocinador_id: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .or(z.literal('')),
    banco_id: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .or(z.literal('')),
    agencia: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .or(z.literal('')),
    conta: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .or(z.literal('')),
    operacao: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .or(z.literal('')),
    pix_chave_tipo: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .or(z.literal('')),
    pix_chave_valor: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .or(z.literal('')),
    servico_assinatura_id: z.string().min(1, { message: 'Campo obrigatório.' }),
    servico_assinatura_codigo: z
      .string()
      .min(1, { message: 'Campo obrigatório.' })
      .or(z.literal('')),
  });

  type FormData = z.infer<typeof formSchema>;

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      if (afiliado) {
        console.log({ afiliado });
        return {
          usuario: {
            nome: afiliado.usuario.nome,
            apelido: afiliado.usuario.apelido,
            nascimento: afiliado.usuario.nascimento
              ? dateBr(afiliado.usuario.nascimento)
              : '',
            cpf: afiliado.usuario.cpf ? maskCpf(afiliado.usuario.cpf) : '',
            email: afiliado.usuario.email,
            celular: afiliado.usuario.celular
              ? maskTelefone(afiliado.usuario.celular)
              : '',
            rg: afiliado.usuario.rg || '',
            rg_emissor: afiliado.usuario.rg_emissor || '',
            mae: afiliado.usuario.mae || '',
            sexo_id: afiliado.usuario.sexo
              ? afiliado.usuario.sexo.id.toString()
              : '',
          },
          patrocinador_id: afiliado.patrocinador?.id || '',
          banco_id: afiliado.banco?.id || '',
          agencia: afiliado.agencia || '',
          conta: afiliado.conta || '',
          operacao: afiliado.operacao || '',
          pix_chave_tipo: afiliado.pix_chave_tipo || '',
          pix_chave_valor: afiliado.pix_chave_valor || '',
          servico_assinatura_id:
            afiliado.servico_assinatura?.id.toString() || '',
          servico_assinatura_codigo: afiliado.servico_assinatura_codigo || '',
        };
      }

      return {
        usuario: {
          nome: '',
          apelido: '',
          nascimento: '',
          cpf: '',
          email: '',
          celular: '',
          rg: '',
          rg_emissor: '',
          mae: '',
          sexo_id: '',
        },
        patrocinador_id: '',
        banco_id: '',
        agencia: '',
        conta: '',
        operacao: '',
        pix_chave_tipo: '',
        pix_chave_valor: '',
        servico_assinatura_id: '',
        servico_assinatura_codigo: '',
      };
    },
  });

  const { data: bancos } = useBancoList();
  const { data: sexos } = useSexoList();
  const { data: assinaturas } = useServicoAssinaturaList();
  const { data: patrocinadores } = useAfiliadoList();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  async function formSubmit(data: FormData) {
    const endpoint = afiliado
      ? `/api/afiliado/${afiliado.id}`
      : '/api/afiliado';

    const httpMethod = afiliado ? 'PUT' : 'POST';

    const message = afiliado
      ? 'Afiliado atualizado com sucesso!'
      : 'Afiliado criado com sucesso!';

    try {
      await axios({
        method: httpMethod,
        url: endpoint,
        data,
      }).then((response) => {
        toast.success(message);
        if (afiliado) {
          router.push('/cadastro/afiliado');
        } else {
          router.push(`/cadastro/afiliado/${response.data.data.id}`);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card.Root>
      <Card.Header>
        <Card.Label title={afiliado ? 'Editar afiliado' : 'Novo afiliado'} />
      </Card.Header>
      <Card.Separator />
      <Card.Body zeroPadding>
        <Form.Root {...methods}>
          <Form.Body onSubmit={handleSubmit(formSubmit)}>
            <Form.Fieldset>
              <Form.Control
                label="Nome completo"
                className="col-span-12 lg:col-span-5"
                error={errors.usuario?.nome?.message}
              >
                <Form.InputText
                  id="nome"
                  name="usuario[nome]"
                  error={errors.usuario?.nome?.message}
                  uppercase
                />
              </Form.Control>

              <Form.Control
                label="Nome curto"
                className="col-span-12 lg:col-span-3"
                error={errors.usuario?.apelido?.message}
              >
                <Form.InputText
                  id="apelido"
                  name="usuario[apelido]"
                  error={errors.usuario?.apelido?.message}
                  uppercase
                />
              </Form.Control>

              <Form.Control
                label="Sexo"
                className="col-span-6 lg:col-span-2"
                error={errors.usuario?.sexo_id?.message}
              >
                {sexos && (
                  <Form.Select
                    id="sexo_id"
                    name="usuario[sexo_id]"
                    options={sexos.map((sexo) => ({
                      value: sexo.id.toString(),
                      label: sexo.nome,
                    }))}
                  />
                )}
              </Form.Control>
              <Form.Control
                label="Nascimento"
                className="col-span-6 lg:col-span-2"
                error={errors.usuario?.nascimento?.message}
              >
                <Form.InputText
                  id="nascimento"
                  name="usuario[nascimento]"
                  error={errors.usuario?.nascimento?.message}
                />
              </Form.Control>

              <Form.Control
                label="Nome da mãe"
                className="col-span-12 lg:col-span-5"
                error={errors.usuario?.mae?.message}
              >
                <Form.InputText
                  id="mae"
                  name="usuario[mae]"
                  error={errors.usuario?.mae?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="CPF"
                className="col-span-12 lg:col-span-3"
                error={errors.usuario?.cpf?.message}
              >
                <Form.MaskInput
                  mask="999.999.999-99"
                  id="cpf"
                  name="usuario[cpf]"
                  error={errors.usuario?.cpf?.message}
                />
              </Form.Control>
              <Form.Control
                label="Identidade (RG)"
                className="col-span-12 lg:col-span-2"
                error={errors.usuario?.rg?.message}
              >
                <Form.InputText
                  id="rg"
                  name="usuario[rg]"
                  error={errors.usuario?.rg?.message}
                  uppercase
                />
              </Form.Control>
              <Form.Control
                label="Órgão emissor"
                className="col-span-12 lg:col-span-2"
                error={errors.usuario?.rg_emissor?.message}
              >
                <Form.InputText
                  id="rg_emissor"
                  name="usuario[rg_emissor]"
                  error={errors.usuario?.rg_emissor?.message}
                  uppercase
                />
              </Form.Control>

              <Form.Control
                label="E-mail"
                className="col-span-12 lg:col-span-5"
                error={errors.usuario?.email?.message}
              >
                <Form.InputText
                  id="email"
                  name="usuario[email]"
                  error={errors.usuario?.email?.message}
                  lowercase
                />
              </Form.Control>
              <Form.Control
                label="Celular"
                className="col-span-12 lg:col-span-3"
                error={errors.usuario?.celular?.message}
              >
                <Form.TelefoneInput
                  id="celular"
                  name="usuario[celular]"
                  error={errors.usuario?.celular?.message}
                />
              </Form.Control>
              <Form.Control
                label="Serviço vinculado"
                className="col-span-6 lg:col-span-2"
                error={errors.servico_assinatura_id?.message}
              >
                {assinaturas && (
                  <Form.Select
                    id="servico_assinatura_id"
                    name="servico_assinatura_id"
                    options={assinaturas.map((assinatura) => ({
                      value: assinatura.id.toString(),
                      label: assinatura.nome,
                    }))}
                  />
                )}
              </Form.Control>
              <Form.Control
                label="Código"
                className="col-span-6 lg:col-span-2"
                error={errors.servico_assinatura_codigo?.message}
              >
                <Form.InputText
                  id="servico_assinatura_codigo"
                  name="servico_assinatura_codigo"
                  error={errors.servico_assinatura_codigo?.message}
                />
              </Form.Control>

              <Form.Control
                label="Banco"
                className="col-span-12 lg:col-span-5"
                error={errors.banco_id?.message}
              >
                {bancos && (
                  <Form.Select
                    id="banco_id"
                    name="banco_id"
                    options={bancos.map((banco) => ({
                      value: banco.id.toString(),
                      label: banco.nome,
                    }))}
                  />
                )}
              </Form.Control>

              <Form.Control
                label="Agência"
                className="col-span-12 lg:col-span-2"
                error={errors.agencia?.message}
              >
                <Form.InputText
                  id="agencia"
                  name="agencia"
                  error={errors.agencia?.message}
                />
              </Form.Control>

              <Form.Control
                label="Conta"
                className="col-span-8 lg:col-span-3"
                error={errors.conta?.message}
              >
                <Form.InputText
                  id="conta"
                  name="conta"
                  error={errors.conta?.message}
                />
              </Form.Control>

              <Form.Control
                label="Operação"
                className="col-span-4 lg:col-span-2"
                error={errors.operacao?.message}
              >
                <Form.InputText
                  id="operacao"
                  name="operacao"
                  error={errors.operacao?.message}
                />
              </Form.Control>

              <Form.Control
                label="Tipo de chave PIX"
                className="col-span-12 lg:col-span-2"
                error={errors.pix_chave_tipo?.message}
              >
                <Form.Select
                  id="pix_chave_tipo"
                  name="pix_chave_tipo"
                  placeholder="Selecione"
                  options={[
                    { value: 'cpf', label: 'CPF' },
                    { value: 'celular', label: 'Celular' },
                    { value: 'email', label: 'E-mail' },
                    { value: 'aleatoria', label: 'Chave aleatória' },
                  ]}
                />
              </Form.Control>

              <Form.Control
                label="Chave PIX"
                className="col-span-12 lg:col-span-3"
                error={errors.pix_chave_valor?.message}
              >
                <Form.InputText
                  id="pix_chave_valor"
                  name="pix_chave_valor"
                  error={errors.pix_chave_valor?.message}
                />
              </Form.Control>

              <Form.Control
                label="Patrocinador"
                className="col-span-12 lg:col-span-4"
                error={errors.patrocinador_id?.message}
              >
                {patrocinadores && (
                  <Form.Select
                    id="patrocinador_id"
                    name="patrocinador_id"
                    options={patrocinadores
                      .filter((patrocinador) => {
                        if (afiliado && afiliado.id === patrocinador.id) {
                          return false;
                        }

                        return true;
                      })
                      .map((patrocinador) => ({
                        value: patrocinador.id,
                        label: patrocinador.usuario.nome,
                      }))}
                    placeholder="Selecione"
                  />
                )}
              </Form.Control>
            </Form.Fieldset>
            <Card.Separator />
            <Form.Footer>
              <Form.FooterSection>
                <Form.Submit>
                  {afiliado ? 'Salvar alterações' : 'Cadastrar'}
                </Form.Submit>
                <Link
                  href={
                    afiliado
                      ? `/cadastro/afiliado/${afiliado.id}`
                      : '/cadastro/afiliado'
                  }
                >
                  <Button color="primary" variant="outline">
                    Cancelar
                  </Button>
                </Link>
              </Form.FooterSection>
            </Form.Footer>
          </Form.Body>
        </Form.Root>
      </Card.Body>
    </Card.Root>
  );
}
