'use client';

import { FormInputProps } from '@/types';
import { useState } from 'react';

export default function FormInput({ label, inputType, placeholder, id, error }: FormInputProps) {
  const [type, setType] = useState(inputType);

  const handleShow = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <div className="max-w-sm flex flex-col gap-2">
      <label className="underline underline-offset-2 font-semibold" htmlFor={id}>
        {label}
      </label>
      <div className="ml-4 space-x-4">
        <input
          className="px-4 py-2 rounded-md placeholder:italic placeholder:font-light"
          type={type || 'text'}
          id={id}
          name={id}
          placeholder={placeholder}
        />
        {id.includes('password') && (
          <button onClick={handleShow} type="button">
            {type === 'text' ? 'hide' : 'show'}
          </button>
        )}
      </div>
      {error && <p className="rounded-md p-4">{error}</p>}
    </div>
  );
}
