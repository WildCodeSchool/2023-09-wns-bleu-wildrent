import { AdminTableRowProps } from '@/types/props';
import AdminTableInput from './AdminTableInput';

export default function AdminTableRow({
  row,
  edit,
  editionMode,
  setEditionMode,
  remove,
}: AdminTableRowProps) {
  const openEditionMode = () => {
    setEditionMode(true);
  };

  const updateRow = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(event.currentTarget);
      const formJSON = Object.fromEntries(formData.entries()) as any;
      if (Object.keys(formJSON).length && edit) {
        await edit(formJSON);
      } else {
        return;
      }
      setEditionMode(false);
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  return (
    <tr id={`${row.id}`} className={`${row.id % 2 !== 0 ? 'bg-slate-200' : 'bg-slate-50'}`}>
      {editionMode ? (
        <form onSubmit={updateRow}>
          {row.cells.map((data, i: number) => (
            <AdminTableInput value={data} key={i} />
          ))}
          <td className="p-4 text-center">
            <button
              className="p-2 h-10 w-12 text-white text-center rounded-md bg-green-600"
              type="submit"
            >
              OK
            </button>
          </td>
          <td className="p-4 text-center">
            {remove && (
              <button
                onClick={() => remove(row.id)}
                className="p-2 text-white text-center rounded-md bg-red-500"
                type="button"
              >
                X
              </button>
            )}
          </td>
        </form>
      ) : (
        <>
          {row.cells.map((data, i: number) => (
            <td className="text-center max-w-32 overflow-hidden text-ellipsis text-nowrap" key={i}>
              {data || 'Non renseigné'}
            </td>
          ))}
          <td className="p-4 text-center">
            {edit && (
              <button
                onClick={openEditionMode}
                className="p-2 h-10 w-12 text-white text-center rounded-md bg-blue-600"
                type="button"
              >
                Edit
              </button>
            )}
          </td>
        </>
      )}
      <td className="p-4 text-center">
        {remove && (
          <button
            onClick={() => remove(row.id)}
            className="p-2 text-white text-center rounded-md bg-red-500"
            type="button"
          >
            X
          </button>
        )}
      </td>
    </tr>
  );
}
