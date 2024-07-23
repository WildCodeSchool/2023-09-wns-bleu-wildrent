import { useRouter } from 'next/navigation';
import { InputRegister, useRegisterMutation } from '@/graphql/generated/schema';
import FormInput from './FormInput';
import client from '@/graphql/client';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { log } from 'console';

const fields = [
  {
    label: 'Nom',
    id: 'lastname',
    type: 'text',
    placeholder: 'Doe',
    required: false,
  },
  {
    label: 'Prénom',
    id: 'firstname',
    type: 'text',
    placeholder: 'John',
    required: false,
  },
  {
    label: 'Email',
    id: 'email',
    type: 'email',
    placeholder: 'john.doe@email.com',
    required: true,
  },
  {
    label: 'Mot de passe',
    id: 'password',
    type: 'password',
    placeholder: '**********',
    required: true,
  },
  {
    label: 'Confirmation du mot de passe',
    id: 'confirm_password',
    type: 'password',
    placeholder: '**********',
    required: true,
  },
];
interface RegisterFormProps {
  closeModal: () => void;
}
export default function RegisterForm({ closeModal }: RegisterFormProps) {
  const router = useRouter();
  const [register, { loading, error }] = useRegisterMutation();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
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
          router.push('/');
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
                required={field.required}
              />
            ))}
            <button
              disabled={loading}
              className="btn btn-active btn-secondary"
              type="submit"
              data-test-id="register-button"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
