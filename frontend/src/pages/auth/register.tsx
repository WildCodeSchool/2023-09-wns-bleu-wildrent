import RegisterForm from '@/components/RegisterForm';
import Layout from '@/components/Layout';

export default function Page() {
  return (
    <Layout>
      <div className="grid place-content-center p-10 gap-12">
        <h1 className="text-center font-bold text-3xl">Enregistrez-vous</h1>
        <RegisterForm />
      </div>
    </Layout>
  );
}
