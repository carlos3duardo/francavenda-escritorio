'use client';
import { Tabs } from '@/components';
import { KeyRound, Landmark, MapPinned, User } from 'lucide-react';
import { DadosPessoais } from './tabs/DadosPessoais';

export function ProfileContent() {
  return (
    <Tabs.Root navigatonPosition="top">
      <Tabs.Navigation tabKey="profile" activeTab="dados-pessoais">
        <Tabs.NavigationGroup>
          <Tabs.NavigationItem
            label="Dados pessoais"
            target="dados-pessoais"
            icon={User}
          />
          <Tabs.NavigationItem
            label="Endereço"
            target="endereco"
            icon={MapPinned}
          />
          <Tabs.NavigationItem
            label="Financeiro"
            target="financeiro"
            icon={Landmark}
          />
          <Tabs.NavigationItem
            label="Segurança"
            target="seguranca"
            icon={KeyRound}
          />
        </Tabs.NavigationGroup>
      </Tabs.Navigation>
      <Tabs.Panels>
        <Tabs.Content id="dados-pessoais" title="Dados pessoais">
          <DadosPessoais />
        </Tabs.Content>

        <Tabs.Content id="endereco" title="Endereço">
          Endereço
        </Tabs.Content>

        <Tabs.Content id="financeiro" title="Financeiro">
          Dados bancários
        </Tabs.Content>

        <Tabs.Content id="seguranca" title="Segurança">
          Segurança
        </Tabs.Content>
      </Tabs.Panels>
    </Tabs.Root>
  );
}
