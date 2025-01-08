'use client';
import { ApiAfiliadoProps } from '@/types';
import { Badge, Card } from '@/components';
import { capitalize, dateBr, maskCpf, maskTelefone } from '@/helpers';

interface AfiliadoVisualizarProps {
  isLoading: boolean;
  isSuccess: boolean;
  afiliado: ApiAfiliadoProps | undefined;
}

export function AfiliadoVisualizar({
  isLoading,
  isSuccess,
  afiliado,
}: AfiliadoVisualizarProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Loader />
      </Card.Root>
    );
  }

  if (isSuccess && afiliado) {
    return (
      <Card.Root>
        <Card.Header>
          <Card.HeaderSection>
            <Card.Label
              title={`Dados do colaborador ${capitalize(afiliado.usuario.apelido)}`}
            />
          </Card.HeaderSection>
          <Card.HeaderSection>
            <Badge
              label={afiliado.situacao.nome}
              color={afiliado.situacao.cor}
            />
          </Card.HeaderSection>
        </Card.Header>
        <Card.Separator />
        <Card.Grid>
          <Card.GridItem className="xl:col-span-6" label="Nome completo">
            {afiliado.usuario.nome}
          </Card.GridItem>
          <Card.GridItem className="md:col-span-6 xl:col-span-3" label="CPF">
            {maskCpf(afiliado.usuario.cpf)}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-3"
            label="Identidade"
          >
            {afiliado.usuario.rg}
            <>&nbsp;</>
            {afiliado.usuario.rg_emissor}
          </Card.GridItem>

          <Card.GridItem className="md:col-span-6 xl:col-span-3" label="Sexo">
            {afiliado.usuario.sexo?.nome || <>&nbsp;</>}
          </Card.GridItem>

          <Card.GridItem
            className="md:col-span-6 xl:col-span-3"
            label="Nascimento"
          >
            {afiliado.usuario.nascimento ? (
              dateBr(afiliado.usuario.nascimento)
            ) : (
              <>&nbsp;</>
            )}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-6" label="Nome da mãe">
            {afiliado.usuario.mae || <>&nbsp;</>}
          </Card.GridItem>

          <Card.GridItem className="md:col-span-8 xl:col-span-6" label="E-mail">
            {afiliado.usuario.email}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-4 xl:col-span-3"
            label="Celular"
          >
            {maskTelefone(afiliado.usuario.celular)}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-3" label="Patrocinador">
            {afiliado.patrocinador ? afiliado.patrocinador.nome : <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridSeparator />
          <Card.GridItem className="xl:col-span-3" label="Banco">
            {afiliado.banco ? (
              `${afiliado.banco.codigo}. ${afiliado.banco.nome}`
            ) : (
              <>&nbsp;</>
            )}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-3"
            label="Agência / Conta / Operação"
          >
            {afiliado.agencia ? afiliado.agencia : <>&nbsp;</>}
            {afiliado.conta ? ` / ${afiliado.conta}` : <>&nbsp;</>}
            {afiliado.operacao ? ` / ${afiliado.operacao}` : <>&nbsp;</>}
          </Card.GridItem>

          <Card.GridItem className="md:col-span-6 xl:col-span-3" label="PIX">
            {afiliado.pix_chave_tipo ? (
              afiliado.pix_chave_tipo.toUpperCase()
            ) : (
              <>&nbsp;</>
            )}
            {afiliado.pix_chave_valor ? (
              ` ${afiliado.pix_chave_valor}`
            ) : (
              <>&nbsp;</>
            )}
          </Card.GridItem>

          <Card.GridItem className="xl:col-span-3" label="Serviço vinculado">
            {afiliado.servico_assinatura?.nome || <>&nbsp;</>}
            {afiliado.servico_assinatura_codigo ? (
              ` (${afiliado.servico_assinatura_codigo})`
            ) : (
              <>&nbsp;</>
            )}
          </Card.GridItem>
        </Card.Grid>
      </Card.Root>
    );
  }
}
