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
  return (
    <>
      <div className="overlay z-30"></div>
      <dialog
        className="bg-slate-200 p-4 rounded-lg z-40 min-w-[25%] fixed top-10 flex flex-col items-center max-h-[75dvh]"
        open={open}
      >
        <button onClick={() => setOpen(false)} className="rounded-full p-2 bg-transparent self-end">
          <MdClose color="#d00000" size={30} />
        </button>
        <div className="overflow-y-auto px-4 py-2">
          <form
            id={'modalForm'}
            className="gap-6 w-full flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <h5 className="font-semibold text-xl py-4">
              {editionMode && id ? `Edit user id n° ${id}` : 'Create new user'}
            </h5>
            {fields.map(({ id, label, placeholder, inputType, options, required }) => (
              <FormInput
                key={id}
                id={id}
                placeholder={placeholder}
                label={label}
                inputType={inputType}
                options={options}
                required={required}
                defaultValue={defaultValues ? defaultValues[id] : ''}
              />
            ))}
          </form>
        </div>
        <button
          form="modalForm"
          className="px-3 py-2 mt-4 bg-neutral-900 text-white rounded-lg self-end"
          type="submit"
        >
          Save
        </button>
      </dialog>
    </>
  );
}
