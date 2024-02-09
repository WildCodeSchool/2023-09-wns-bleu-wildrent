import RegisterForm from '@/components/RegisterForm';

export default function Page() {
  return (
    <div className="grid place-content-center p-10 gap-12">
      <h1 className="text-center font-bold text-3xl">Enregistrez-vous</h1>
      <RegisterForm />
    </div>
  );
}
