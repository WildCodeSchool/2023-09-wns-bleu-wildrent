import FormInput from '@/components/FormInput';
import Layout from '@/components/Layout';
import React from 'react';

const fields = [
  {
    label: 'Lastname',
    id: 'lastname',
    type: 'text',
    placeholder: 'DOE',
    required: false,
  },
  {
    label: 'Firstname',
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
    label: 'Message',
    id: 'message',
    type: 'textarea',
    placeholder: 'Enter your message here...',
    required: true,
  },
];

const About = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const user = Object.fromEntries(formData.entries());
    console.log(user);
  };
  return (
    <Layout>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="flex flex-col gap-4 rounded p-4" onSubmit={handleSubmit}>
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
          <button className="btn btn-active btn-secondary" type="submit" disabled>
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default About;
