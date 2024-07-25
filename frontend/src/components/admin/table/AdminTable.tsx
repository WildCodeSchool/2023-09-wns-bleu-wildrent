import { TableRow } from '@/types';
import { AdminTableProps } from '@/types/props';
import AdminTableRow from './AdminTableRow';
import { BiPlusCircle } from 'react-icons/bi';

export default function AdminTable({ columns, dataset, remove, edit, create }: AdminTableProps) {
  return (
    <>
      <table className="min-w-full bg-blue rounded mt-4 overflow-hidden">
        <thead className="bg-secondary text-white space-y-2 w-full">
          <tr className="bg-secondary text-left text-white">
            {columns.map(({ title, id }) => (
              <th className="px-4 py-2 text-center" key={id}>
                {title}
              </th>
            ))}
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataset.map((row: TableRow) => (
            <AdminTableRow key={row.id} remove={remove} edit={edit} row={row} />
          ))}
        </tbody>
      </table>
      {create && (
        <button
          data-test-id="add_btn"
          className="w-full py-2 bg-secondary text-white flex justify-center items-center rounded-b"
          onClick={create}
          type="button"
        >
          <BiPlusCircle size={40} />
        </button>
      )}
    </>
  );
}
