import FormInput from '@/components/FormInput';
import { AdminTableModalProps } from '@/types/props';

export default function AdminTableModal({
  fields,
  handleSubmit,
  open,
  setOpen,
}: AdminTableModalProps) {
  return (
    <>
      <div className="overlay z-30"></div>
      <dialog className="bg-orange-400 p-6 rounded-lg z-40 fixed top-10" open={open}>
        <button onClick={() => setOpen(false)} className="float-end rounded-full p-2 bg-red-600">
          X
        </button>
        <form className="space-y-2 pt-8" onSubmit={handleSubmit}>
          {fields.map(({ id, label, placeholder, inputType, options }) => (
            <FormInput
              key={id}
              id={id}
              placeholder={placeholder}
              label={label}
              inputType={inputType}
              options={options}
            />
          ))}
          <button className="px-3 py-2 bg-neutral-900 text-white rounded-lg ml-[70%]" type="submit">
            Enregistrer
          </button>
        </form>
      </dialog>
    </>
  );
}
