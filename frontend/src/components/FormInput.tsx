'use client';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FormInputProps } from '@/types/props';
import { useState } from 'react';

export default function FormInput({
  label,
  inputType,
  placeholder,
  id,
  options,
  defaultValue,
  required,
}: FormInputProps) {
  const [type, setType] = useState(inputType);
  const [isInvalid, setIsInvalid] = useState(false);
  const handleShow = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  const handleValidation = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { validity } = event.target;
    setIsInvalid(!validity.valid);
  };
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <label className="font-semibold text-center w-full" htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full space-x-4">
        {type === 'textarea' ? (
          <textarea
            className="px-4 py-2 w-full rounded-md placeholder:italic placeholder:font-light"
            id={id}
            name={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            aria-required={required}
            aria-invalid={isInvalid ? 'true' : 'false'}
            onBlur={handleValidation}
            required={required}
          />
        ) : type === 'select' ? (
          <select
            className="px-4 py-2 w-full rounded-md"
            id={id}
            name={id}
            defaultValue={defaultValue as string}
            aria-required={required}
            aria-invalid={isInvalid ? 'true' : 'false'}
            onBlur={handleValidation}
            required={required}
          >
            <option value="">{placeholder}</option>
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
            aria-required={required}
            aria-invalid={isInvalid ? 'true' : 'false'}
            onBlur={handleValidation}
            required={required}
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
    </div>
  );
}
