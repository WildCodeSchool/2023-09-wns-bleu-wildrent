import { useRouter } from 'next/navigation';
import { InputRegister, useRegisterMutation } from '@/graphql/generated/schema';
import FormInput from './FormInput';
import client from '@/graphql/client';
import React, { useEffect } from 'react';
import { useRef } from 'react';

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
interface RegisterFormProps {
  closeModal: () => void;
}
export default function RegisterForm({ closeModal }: RegisterFormProps) {
  const router = useRouter();
  const [register, { data, loading, error }] = useRegisterMutation();
  const modalRef = useRef<HTMLDialogElement>(null);

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
          closeModal();
        }
      } catch (err) {
        console.error(`could not create account: ${err}`);
      } finally {
        await client.resetStore();
      }
    }
  };

  return (
    <dialog id="my_modal_2" className="modal" ref={modalRef} open>
      <div className="modal-box p-0">
        <div className="bg-cover p-5 bg-secondary">
          <h3 className="font-bold text-lg text-center">Sign up</h3>
        </div>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="flex flex-col gap-4 rounded p-4" onSubmit={handleSubmit}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
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
              Sign up
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
