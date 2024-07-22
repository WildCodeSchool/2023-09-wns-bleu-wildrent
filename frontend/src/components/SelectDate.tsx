import client from '@/graphql/client';
import {
  AllProductRefsDocument,
  useGetProductAvailableByDateRangeQuery,
} from '@/graphql/generated/schema';
import React, { useEffect, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { useDate } from './hooks/DatesContext';
import { useAlert } from './hooks/AlertContext';

function SelectDate() {
  const nbDaysLocalStorage = JSON.parse(localStorage.getItem('nbDays') || '0');
  const [nbDays, setNbDays] = useState(nbDaysLocalStorage);
  const [filter, setFilter] = useState<any>({ startDate: '', endDate: '' });

  const { data, loading, error, refetch } = useGetProductAvailableByDateRangeQuery({
    variables: filter,
    onCompleted: (data) => {
      client.writeQuery({
        query: AllProductRefsDocument,
        data: {
          allProductRefs: data.getProductAvailableByDateRange.items,
        },
      });
    },
  });

  useEffect(() => {
    localStorage.setItem('nbDays', JSON.stringify(nbDays));
  }, [nbDays]);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const filter = Object.fromEntries(formData.entries());

      setFilter(filter);
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      refetch();
    }
  };

  return (
    <div className="mb-5 p-2 flex flex-col gap-4 items-center border rounded-xl bg-secondary/50">
      <div className="text-xl text-primary text-center font-semibold">
        Select dates to explore our catalog of products available during that period:
      </div>
      <form onSubmit={handleFilter} className="flex items-center">
        <div className="relative">
          <input name="startDate" type="date" className="input input-bordered w-full max-w-xs" />
        </div>
        <span className="mx-4 text-primary">to</span>
        <div className="relative">
          <input name="endDate" type="date" className="input input-bordered w-full max-w-xs" />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="mx-4 text-primary btn btn-circle btn-secondary"
        >
          <MdCheck type="button" size={25} />
        </button>
      </form>
    </div>
  );
}

export default SelectDate;
