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

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6 text-secondary">Contact Us</h1>
        <p className="m-4 text-justify">
          Tootsie roll chupa chups candy canes jujubes sesame snaps dragée. Sugar plum macaroon
          liquorice muffin chocolate cake. Pie tootsie roll macaroon dessert bear claw caramels
          chocolate cake sugar plum. Shortbread cake pie cake oat cake danish.
        </p>
        <form
          className="flex flex-col gap-4 rounded p-4 bg-secondary/10 bg-base-100 shadow-xl w-2/4 mx-auto"
          onSubmit={handleSubmit}
        >
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
          <button className="btn btn-active btn-secondary w-full" type="submit" disabled>
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
