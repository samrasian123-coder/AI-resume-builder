import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-40 border-b bg-white dark:bg-gray-800 dark:border-gray-700 h-16 flex items-center px-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Dashboard
        </h2>
        <div className="ml-auto flex items-center space-x-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button className="text-sm font-medium text-red-600 hover:text-red-500">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-6 sm:p-10">
        {children}
      </main>
    </div>
  );
}
