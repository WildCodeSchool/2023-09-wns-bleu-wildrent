import { AdminTableRowProps } from '@/types/props';
import { MdClose } from 'react-icons/md';

export default function AdminTableRow({ row, edit, remove }: AdminTableRowProps) {
  return (
    <tr id={`${row.id}`} className={`${row.id % 2 !== 0 ? 'bg-slate-200' : 'bg-slate-50'}`}>
      {row.cells.map((data, i: number) => (
        <td
          data-test-value={data || 'empty'}
          className="text-center max-w-32 overflow-hidden text-ellipsis text-nowrap"
          key={i}
        >
          {data || 'Non renseigné'}
        </td>
      ))}
      <td className="px-4 py-2 space-x-3 border-b">
        {edit && (
          <button
            data-test-id="edit_btn"
            onClick={() => edit(row.id)}
            className="mr-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded"
            type="button"
          >
            Edit
          </button>
        )}
      </td>
      <td className="px-4 py-2 space-x-3 border-b">
        {remove && (
          <button
            data-test-id="delete_btn"
            onClick={() => remove(row.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            type="button"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}
