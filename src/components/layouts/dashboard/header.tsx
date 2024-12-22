import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { UserNav } from './user-nav';
import { Building2 } from 'lucide-react';

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Building2 className="h-6 w-6" />
          <span>Ask Your HR</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {user && <UserNav user={user} />}
        </div>
      </div>
    </header>
  );
}