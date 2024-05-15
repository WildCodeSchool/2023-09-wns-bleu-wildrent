import { AdminTableProps, TableRow } from '@/types';

export default function AdminTable({ columns, dataset, remove, edit }: AdminTableProps) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-blue-500 text-white space-y-2 w-full">
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
          <tr className={`${i % 2 === 0 && 'bg-slate-200'}`} key={id}>
            {cells.map((data, i: number) => (
              <td
                className="text-center max-w-32 overflow-hidden text-ellipsis text-nowrap"
                key={i}
              >
                {data || 'Non renseigné'}
              </td>
            ))}
            {edit && (
              <td className="p-4 grid place-content-center">
                <button
                  className="p-2 h-10 w-12 text-white text-center rounded-md bg-blue-600"
                  type="button"
                >
                  Edit
                </button>
              </td>
            )}
            {remove && (
              <td>
                <button
                  onClick={() => remove(id)}
                  className="p-2 text-white text-center rounded-md bg-red-500"
                  type="button"
                >
                  X
                </button>
              </td>
            )}
          </tr>
        ))}
        <tr aria-colspan={columns.length + 2} className="w-full flex justify-center">
          <button type="button">Add Item</button>
        </tr>
      </tbody>
    </table>
  );
}
