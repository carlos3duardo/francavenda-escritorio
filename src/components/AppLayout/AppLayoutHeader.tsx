import { UserMenu } from './ext/UserMenu';
import { ColorModeSwitch, ScreenSizeView } from '@/components';
import UserAvatar from './ext/UserAvatar';
import { Menu, Search } from 'lucide-react';

export function AppLayoutHeader() {
  return (
    <header className="h-16 px-8 flex justify-between gap-4 items-center bg-body-background dark:bg-body-background-dark">
      <div className="flex gap-4 items-center">
        <div>
          <button className="h-9 w-9 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-200">
            <Menu size={24} />
          </button>
        </div>
        <div>
          <div className="w-[300px] flex items-center gap-2 bg-white h-9 pl-3 pr-1 rounded-md">
            <input
              type="text"
              className="flex-1 h-9 text-sm font-medium text-slate-600 outline-none"
            />
            <button className="h-9 w-9 flex items-center justify-center">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ScreenSizeView />

        <div role="menu" className="flex items-center">
          <ColorModeSwitch />
        </div>

        <UserMenu>
          <UserAvatar />
        </UserMenu>
      </div>
    </header>
  );
}
