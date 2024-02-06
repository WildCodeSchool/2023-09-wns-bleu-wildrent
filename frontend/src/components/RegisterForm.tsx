'use client';

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
  const [register] = useRegisterMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const password = formData.get('password') as string;
    if (formData.get('password') === formData.get('confirm_password')) {
      formData.delete('confirm_password');
      try {
        const { data } = await register({
          variables: {
            newUser: {
              email: formData.get('email') as string,
              firstname: formData.get('firstname') as string,
              lastname: formData.get('lastname') as string,
              password,
            },
          },
        });
        console.log(data);
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
      <button className="text-center self-center px-3 py-2 border rounded-lg w-fit" type="submit">
        Inscription
      </button>
    </form>
  );
}
