import { LoginForm } from '@/features/master-auth/ui/login-form';
import { RegisterDialog } from '@/features/master-auth/ui/register-dialog';

export function MasterAuthPage() {
  return (
    <main className="mx-auto mt-[15vh] w-full max-w-xl rounded-3xl border border-border bg-card p-8 shadow-2xl">
      <section className="flex flex-col items-center gap-10">
        <h1 className="text-2xl font-semibold">Вход мастера</h1>
        <LoginForm />
        <RegisterDialog />
      </section>
    </main>
  );
}
