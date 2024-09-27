import { Bell, LayoutGrid } from 'lucide-react';
import { UserMenu } from './ext/UserMenu';
import { ColorModeSwitch, ScreenSizeView } from '@/components';
import UserAvatar from './ext/UserAvatar';

export function AppLayoutHeader() {
  return (
    <header className="h-20 px-8 flex justify-between gap-4 items-center">
      <div className="flex flex-1 items-center justify-between">
        <div id="app-page-header" />
        <div id="app-page-actions" />
      </div>
      <div className="flex items-center gap-4">
        <ScreenSizeView />

        <div role="menu" className="flex items-center">
          <ColorModeSwitch />
          <button className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-300 rounded-full transition">
            <Bell size={18} />
          </button>
          <button className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-300 rounded-full transition">
            <LayoutGrid size={18} />
          </button>
        </div>

        <UserMenu>
          <UserAvatar />
        </UserMenu>
      </div>
    </header>
  );
}
