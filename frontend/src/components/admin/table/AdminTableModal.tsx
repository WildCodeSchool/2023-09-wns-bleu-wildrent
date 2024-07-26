import React from 'react';
import FormInput from '@/components/FormInput';
import { AdminTableModalProps } from '@/types/props';
import { MdClose } from 'react-icons/md';

export default function AdminTableModal({
  fields,
  handleSubmit,
  open,
  setOpen,
  editionMode,
  id,
  defaultValues,
}: AdminTableModalProps) {
  if (!open) return null;

  return (
    <div>
      <input type="checkbox" id="admin_modal" className="modal-toggle" checked={open} readOnly />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 bg-transparent self-end"
          >
            <MdClose color="#d00000" size={30} />
          </button>
          <h3 className="text-lg font-bold">
            {editionMode && id ? `Edit user id n° ${id}` : 'Create new user'}
          </h3>
          <form
            className="flex flex-col gap-4 p-4 border rounded"
            onSubmit={handleSubmit}
            id="modalForm"
          >
            {fields.map(({ id, label, placeholder, inputType, options, required }) => (
              <div key={id} className="w-full">
                <FormInput
                  id={id}
                  placeholder={placeholder}
                  label={label}
                  inputType={inputType}
                  options={options}
                  required={required}
                  defaultValue={defaultValues ? defaultValues[id] : ''}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary w-full" disabled={false}>
              Save
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="admin_modal" onClick={() => setOpen(false)}>
          Close
        </label>
      </div>
    </div>
  );
}
