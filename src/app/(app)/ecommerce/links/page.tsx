import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Alert, AppLayout } from '@/components';
import { LinksContainer } from './_components/LinksContainer';
import { UserCookieProps } from '@/types';
import { getCodigosAfiliado } from '@/actions/getCodigosAfiliado';

export const metadata: Metadata = {
  title: 'Links de indicação',
};

export default async function Page() {
  const cookieStore = cookies();

  const userCookie = cookieStore.has('frv:user')
    ? cookieStore.get('frv:user')?.value
    : null;

  const user = userCookie ? (JSON.parse(userCookie) as UserCookieProps) : null;

  if (!user) {
    return (
      <>
        <AppLayout.PageHeader>
          <AppLayout.PageTitle title={`Meus links de indicação`} />
        </AppLayout.PageHeader>
        <AppLayout.PageContent>
          <Alert.Root type="error">
            <Alert.Message message="Erro desconhecido" />
            <Alert.Description>
              Aconteceu algo estranho aqui.
              <br />
              Por favor, saia do sistema e tente logar novamente.
              <br />
              <br />
              Se o problema persistir, entre em contato com o suporte através do
              e-mail {process.env.NEXT_PUBLIC_EMAIL_SUPORTE}.
            </Alert.Description>
          </Alert.Root>
        </AppLayout.PageContent>
      </>
    );
  }

  const codigos = user.afiliado
    ? await getCodigosAfiliado(user.afiliado.id)
    : [];

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title={`Meus links de indicação`} />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        {!user.afiliado ? (
          <Alert.Root type="warning">
            <Alert.Message message="Perfil de afiliado não encontrado" />
            <Alert.Description>
              Você precisa estar cadastrado como afiliado para poder divulgar
              links de indicação.
            </Alert.Description>
          </Alert.Root>
        ) : (
          <div className="flex flex-col gap-4">
            <Alert.Root type="hint">
              <Alert.Message message="Divulgue seus links de indicação" />
              <Alert.Description>
                Quando um usuário acessa as páginas da loja através de um de
                seus links de indicação e realiza uma compra, você receberá uma
                comissão pela venda.
                <br />
                Divulgue os seus links de indicação para o seu público.
              </Alert.Description>
            </Alert.Root>

            <LinksContainer afiliadoId={user.afiliado.id} codigos={codigos} />
          </div>
        )}
      </AppLayout.PageContent>
    </>
  );
}
