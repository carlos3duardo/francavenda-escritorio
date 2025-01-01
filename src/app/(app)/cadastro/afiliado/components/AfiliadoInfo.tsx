'use client';
import { ApiAfiliadoProps } from '@/types';
import { Card } from '@/components';
import { maskCpf, maskTelefone } from '@/helpers';
import { Circle } from '@phosphor-icons/react/dist/ssr';

interface AfiliadoInfoProps {
  isLoading: boolean;
  isSuccess: boolean;
  afiliado: ApiAfiliadoProps | undefined;
}

export function AfiliadoInfo({
  isLoading,
  isSuccess,
  afiliado,
}: AfiliadoInfoProps) {
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
          <Card.Label title={afiliado.usuario.apelido} />
        </Card.Header>
        <Card.Separator />
        <Card.Grid>
          <Card.GridItem className="xl:col-span-6" label="Nome">
            {afiliado.usuario.nome}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-3" label="CPF">
            {maskCpf(afiliado.usuario.cpf)}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-3" label="Situação">
            <div className="flex items-center gap-1">
              <Circle
                size={10}
                weight="fill"
                style={{ color: afiliado.situacao.cor }}
              />
              {afiliado.situacao.nome}
            </div>
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-6" label="E-mail">
            {afiliado.usuario.email}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-3" label="Celular">
            {maskTelefone(afiliado.usuario.celular)}
          </Card.GridItem>
          <Card.GridItem className="xl:col-span-3" label="Patrocinador">
            {afiliado.patrocinador ? (
              afiliado.patrocinador.apelido
            ) : (
              <>&nbsp;</>
            )}
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
            className="xl:col-span-3"
            label="Agência / Conta / Operação"
          >
            {afiliado.agencia ? afiliado.agencia : <>&nbsp;</>}
            {afiliado.conta ? ` / ${afiliado.conta}` : <>&nbsp;</>}
            {afiliado.operacao ? ` / ${afiliado.operacao}` : <>&nbsp;</>}
          </Card.GridItem>

          <Card.GridItem className="xl:col-span-3" label="PIX">
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
        </Card.Grid>
      </Card.Root>
    );
  }
}
