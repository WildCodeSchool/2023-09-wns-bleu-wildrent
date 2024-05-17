import { AdminTableRowProps } from '@/types/props';

export default function AdminTableRow({ row, edit, remove }: AdminTableRowProps) {
  return (
    <tr id={`${row.id}`} className={`${row.id % 2 !== 0 ? 'bg-slate-200' : 'bg-slate-50'}`}>
      {row.cells.map((data, i: number) => (
        <td className="text-center max-w-32 overflow-hidden text-ellipsis text-nowrap" key={i}>
          {data || 'Non renseigné'}
        </td>
      ))}
      <td className="p-4 text-center">
        {edit && (
          <button
            onClick={() => edit(row.id)}
            className="p-2 h-10 w-12 text-white text-center rounded-md bg-blue-600"
            type="button"
          >
            Edit
          </button>
        )}
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
    </tr>
  );
}
