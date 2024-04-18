import { useRouter } from 'next/navigation';
import { InputRegister, useRegisterMutation } from '@/graphql/generated/schema';
import FormInput from './FormInput';
import client from '@/graphql/client';

const fields = [
  {
    label: 'Nom',
    id: 'lastname',
    type: 'text',
    placeholder: 'Doe',
  },
  {
    label: 'Prénom',
    id: 'firstname',
    type: 'text',
    placeholder: 'John',
  },
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
  {
    label: 'Confirmation du mot de passe',
    id: 'confirm_password',
    type: 'password',
    placeholder: '**********',
  },
];

export default function RegisterForm() {
  const router = useRouter();
  const [register, { data, loading, error }] = useRegisterMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    if (formData.get('password') === formData.get('confirm_password')) {
      formData.delete('confirm_password');
      const newUser = Object.fromEntries(formData.entries()) as InputRegister;
      try {
        const { data } = await register({
          variables: {
            newUser,
          },
        });
        if (data?.register.success && !error && !loading) {
          router.push('/auth/login');
        }
      } catch (err) {
        console.error(`could not create account: ${err}`);
      } finally {
        client.resetStore();
      }
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
      <button disabled={loading} className="btn btn-active btn-secondary" type="submit">
        Inscription
      </button>
    </form>
  );
}
