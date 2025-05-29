import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { AppLayout } from '@/components';
import { UserCookieProps } from '@/types';
import { SaqueAfiliadoTabela } from './_components/SaqueAfiliadoTabela';
import { WidgetSaldoDisponivel } from './_components/WidgetSaldoDisponivel';
import { WidgetSolicitarSaque } from './_components/WidgetSolicitarSaque';
import { SaqueTabela } from './_components/SaqueTabela';

export const metadata: Metadata = {
  title: 'Saques',
};

export default async function Page() {
  const cookieStore = await cookies();

  const usuario = cookieStore.has('frv:user')
    ? (JSON.parse(
        cookieStore.get('frv:user')?.value as string,
      ) as UserCookieProps)
    : null;

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Saques" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Financeiro', href: '/financeiro' },
              { label: 'Saques' },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        {usuario?.afiliado ? (
          <div className="w-full grid grid-cols-12 gap-4 2xl:gap-6">
            <div className="col-span-12 lg:col-span-8">
              <SaqueAfiliadoTabela afiliadoId={usuario.afiliado.id} />
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 2xl:gap-6">
              <WidgetSaldoDisponivel afiliadoId={usuario.afiliado.id} />
              <WidgetSolicitarSaque afiliadoId={usuario.afiliado.id} />
            </div>
          </div>
        ) : usuario?.admin ? (
          <div>
            <SaqueTabela />
          </div>
        ) : (
          <>???</>
        )}
      </AppLayout.PageContent>
    </>
  );
}
