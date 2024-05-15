import LoginForm from '@/components/LoginForm';
import Layout from '@/components/Layout';

export default function Page() {
  return (
    <Layout>
      <div className="grid place-content-center p-10 gap-12">
        <h1 className="text-center font-bold text-3xl">Connectez-vous</h1>
        <LoginForm />
      </div>
    </Layout>
  );
}
