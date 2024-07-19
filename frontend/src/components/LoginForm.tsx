import { useLoginMutation, InputLogin } from '../graphql/generated/schema';
import FormInput from './FormInput';
import { useRouter } from 'next/navigation';
import client from '@/graphql/client';
import { useRef, useState } from 'react';
import { useAlert } from './hooks/AlertContext';

const fields = [
  {
    label: 'Email',
    id: 'email',
    type: 'email',
    placeholder: 'john.doe@email.com',
    required: true,
  },
  {
    label: 'Password',
    id: 'password',
    type: 'password',
    placeholder: '**********',
    required: true,
  },
];

interface LoginFormProps {
  closeModal: () => void;
  switchToRegister: () => void;
}

export default function LoginForm({ closeModal, switchToRegister }: LoginFormProps) {
  const router = useRouter();
  const [login, { loading, error }] = useLoginMutation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const { showAlert } = useAlert();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const user = Object.fromEntries(formData.entries()) as InputLogin;

      const response = await login({
        variables: {
          user,
        },
      });
      if (response.data?.login.success) {
        showAlert('success', response.data?.login?.message, 30000);
        closeModal();
      } else {
        showAlert('error', response.data?.login?.message ?? 'Wrong credentials', 3000);
      }
    } catch (err) {
      console.error(`Could not login: ${err}`);
    } finally {
      await client.resetStore();
    }
  };

  return (
    <dialog id="my_modal_2" className="modal" ref={modalRef} open>
      <div className="modal-box p-0">
        <div className="bg-cover p-5 bg-secondary">
          <h3 className="font-bold text-lg text-center">Login</h3>
        </div>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="flex flex-col gap-4 rounded p-4" onSubmit={handleSubmit}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
              type="button"
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
              className="btn btn-active btn-secondary"
              type="submit"
              data-test-id="login-button"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mb-2">
            Not a member?{' '}
            <a
              onClick={() => {
                closeModal();
                switchToRegister();
              }}
              data-test-id="register1-button"
              className="font-semibold leading-6 text-primary hover:text-secondary cursor-pointer"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </dialog>
  );
}
