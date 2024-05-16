import { TableRow } from '@/types';
import { AdminTableProps } from '@/types/props';
import { useState } from 'react';
import AdminTableRow from './AdminTableRow';

export default function AdminTable({ columns, dataset, remove, edit, create }: AdminTableProps) {
  const [editionMode, setEditionMode] = useState<boolean>(false);

  return (
    <>
      <table className="min-w-full bg-white rounded-t overflow-hidden">
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
          {dataset.map((row: TableRow) => (
            <AdminTableRow
              key={row.id}
              remove={remove}
              edit={edit}
              editionMode={editionMode}
              setEditionMode={setEditionMode}
              row={row}
            />
          ))}
        </tbody>
      </table>
      {create && (
        <button
          className="w-full py-2 bg-green-400 text-white rounded-b"
          onClick={create}
          type="button"
        >
          Add Item
        </button>
      )}
    </>
  );
}
