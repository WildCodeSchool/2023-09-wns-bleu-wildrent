'use client';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FormInputProps } from '@/types';
import { useState } from 'react';

export default function FormInput({
  label,
  inputType,
  placeholder,
  id,
  error,
  options,
  defaultValue,
}: FormInputProps) {
  const [type, setType] = useState(inputType);

  const handleShow = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <div className="max-w-sm flex flex-col gap-2">
      <label className="font-semibold text-center" htmlFor={id}>
        {label}
      </label>
      <div className="relative w-full space-x-4">
        {type === 'textarea' ? (
          <textarea
            className="px-4 py-2 w-full pr-10 rounded-md placeholder:italic placeholder:font-light"
            id={id}
            name={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        ) : type === 'select' ? (
          <select className="px-4 py-2 rounded-md" id={id} name={id} defaultValue={defaultValue}>
            <option disabled value="">
              Select an option
            </option>
            {options &&
              options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        ) : (
          <input
            className="w-full px-4 py-2 rounded-md placeholder:italic placeholder:font-light"
            type={type || 'text'}
            id={id}
            name={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        )}
        {id.includes('password') && (
          <button
            onClick={handleShow}
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            {type === 'text' ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <p className="rounded-md p-4">{error}</p>}
    </div>
  );
}
