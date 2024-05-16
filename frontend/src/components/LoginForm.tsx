import { useLoginMutation, InputLogin } from '../graphql/generated/schema';
import FormInput from './FormInput';
import { useRouter } from 'next/navigation';
import client from '@/graphql/client';

const fields = [
  {
    label: 'Email',
    id: 'email',
    type: 'email',
    placeholder: 'john.doe@email.com',
  },
  {
    label: 'Mot de passe',
    id: 'password',
    type: 'password',
    placeholder: '**********',
  },
];

export default function LoginForm() {
  const router = useRouter();
  const [login] = useLoginMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const user = Object.fromEntries(formData.entries()) as InputLogin;

      const response = await login({
        variables: {
          user,
        },
      });
      if (response.data?.login.success) {
        router.push('/');
      }
    } catch (err) {
      console.error(`Could not create account: ${err}`);
    } finally {
      await client.resetStore();
    }
  };
  return (
    <form className="flex flex-col gap-4 border rounded p-4" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormInput
          key={field.id}
          id={field.id}
          label={field.label}
          placeholder={field.placeholder}
          inputType={field.type}
        />
      ))}
      <button className="btn btn-active btn-secondary" type="submit" data-test-id="login-button">
        Se Connecter
      </button>
    </form>
  );
}
