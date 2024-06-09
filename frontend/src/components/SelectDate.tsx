import React from 'react';
import { MdCheck } from 'react-icons/md';

function SelectDate() {
  const handleFilter = () => {};
  return (
    <div className="mb-5 p-2 flex flex-col gap-4 items-center border rounded-xl bg-secondary/50">
      <div className="text-xl  text-primary">
        Select dates to explore our catalog of products available during that period:
      </div>
      <div className="flex items-center">
        <div className="relative">
          <input name="start" type="date" className="input input-bordered w-full max-w-xs" />
        </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative">
          <input name="end" type="date" className="input input-bordered w-full max-w-xs" />
        </div>
        <button
          onClick={handleFilter}
          type="button"
          className="mx-4 text-gray-500 btn btn-ghost btn-circle"
        >
          <MdCheck type="button" size={25} />
        </button>
      </div>
    </div>
  );
}

export default SelectDate;
