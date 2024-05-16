import { TableRow } from '@/types';
import { AdminTableProps } from '@/types/props';

export default function AdminTable({ columns, dataset, remove, edit, create }: AdminTableProps) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-400 text-white space-y-2 w-full">
        <tr>
          {columns.map(({ title, id }) => (
            <th className="py-3 px-4 text-center font-semibold text-sm" key={id}>
              {title}
            </th>
          ))}
          <th className="py-3 px-4 text-center font-semibold text-sm"></th>
          <th className="py-3 px-4 text-center font-semibold text-sm"></th>
        </tr>
      </thead>
      <tbody>
        {dataset.map(({ cells, id }: TableRow, i: number) => (
          <tr className={`${i % 2 !== 0 ? 'bg-slate-200' : 'bg-slate-50'}`} key={id}>
            {cells.map((data, i: number) => (
              <td
                className="text-center max-w-32 overflow-hidden text-ellipsis text-nowrap"
                key={i}
              >
                {data || 'Non renseigné'}
              </td>
            ))}
            <td className="p-4 text-center">
              {edit && (
                <button
                  onClick={() => edit(id)}
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
                  onClick={() => remove(id)}
                  className="p-2 text-white text-center rounded-md bg-red-500"
                  type="button"
                >
                  X
                </button>
              )}
            </td>
          </tr>
        ))}
        {create && (
          <tr className="w-full flex justify-center">
            <td aria-colspan={columns.length + 2}>
              <button onClick={create} type="button">
                Add Item
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
