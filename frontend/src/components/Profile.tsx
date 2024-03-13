'use client';

import { InputUpdate, useUpdateProfileMutation } from '@/graphql/generated/schema';
import FormInput from './FormInput';
import { useState } from 'react';
import { User } from '@/types';

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
    label: 'Adresse',
    id: 'address',
    type: 'text',
    placeholder: '123 rue du lorem ipsum',
  },
  {
    label: 'City',
    id: 'city',
    type: 'text',
    placeholder: 'LoremCity',
  },
  {
    label: 'Code Postal',
    id: 'cp',
    type: 'text',
    placeholder: '12345',
  },
];

export default function Profile({ user }: { user: User }) {
  const [updateUser, { data, loading, error }] = useUpdateProfileMutation();
  const [update, setUpdate] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const user = Object.fromEntries(formData.entries()) as InputUpdate;
      await updateUser({
        variables: {
          updatedUser: user,
        },
      });
      if (data?.updateUser && !error && !loading) {
        console.log(data.updateUser);
        setUpdate(false);
      }
    } catch (err) {
      console.error(`Could not create account: ${err}`);
    }
  };

  if (!update) {
    return (
      <div className="space-y-6 border w-1/2 mx-auto p-4 rounded-sm">
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setUpdate(true)}>
          Modifier
        </button>
        <div className="flex gap-4">
          <span className="underline font-semibold">Nom:</span>
          <p>{user.firstname}</p>
        </div>
        <div className="flex gap-4">
          <span className="underline font-semibold">Prénom:</span>
          <p>{user.lastname}</p>
        </div>
        <div className="flex gap-4">
          <span className="underline font-semibold">Email:</span>
          <p>{user.email}</p>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <span className="underline font-semibold">Adresse:</span>
            <p>{user.address || 'Non renseigné'}</p>
          </div>
          <div>
            <span className="underline font-semibold">Ville:</span>
            <p>{user.city || 'Non renseigné'}</p>
          </div>
          <div>
            <span className="underline font-semibold">Code Postal:</span>
            <p>{user.cp || 'Non renseigné'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-6 border w-1/2 mx-auto p-4 rounded-sm" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormInput
          key={field.id}
          id={field.id}
          label={field.label}
          placeholder={field.placeholder}
          inputType={field.type}
        />
      ))}
      <button className="bg-green-500 text-white p-2 rounded-md" type="submit">
        Update
      </button>
    </form>
  );
}
