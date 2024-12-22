import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './header';
import { DashboardSidebar } from './sidebar';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}