import LoginForm from '@/components/LoginForm';

export default function Page() {
  return (
    <div className="grid place-content-center p-10 gap-12">
      <h1 className="text-center font-bold text-3xl">Connectez-vous</h1>
      <LoginForm />
    </div>
  );
}
