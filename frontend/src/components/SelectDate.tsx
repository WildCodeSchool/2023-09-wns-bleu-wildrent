import React, { useEffect, useState } from 'react';
import { MdCheck } from 'react-icons/md';

function SelectDate() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const nbDaysLocalStorage = JSON.parse(localStorage.getItem('nbDays') || '0');
  const [nbDays, setNbDays] = useState(nbDaysLocalStorage);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
  };

  useEffect(() => {
    localStorage.setItem('nbDays', JSON.stringify(nbDays));
  }, [nbDays]);
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
  };

  const calculateNbDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nbDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nbDays;
  };

  const handleFilter = () => {
    console.log('🚀 ~ SelectDate ~ nbDays', calculateNbDays());
    setNbDays(calculateNbDays());
  };
  return (
    <div className="mb-5 p-2 flex flex-col gap-4 items-center border rounded-xl bg-secondary/50">
      <div className="text-xl text-primary text-center font-semibold">
        Select dates to explore our catalog of products available during that period:
      </div>
      <div className="flex items-center">
        <div className="relative">
          <input
            name="start"
            type="date"
            className="input input-bordered w-full max-w-xs"
            onChange={handleStartDateChange}
          />
        </div>
        <span className="mx-4 text-primary">to</span>
        <div className="relative">
          <input
            name="end"
            type="date"
            className="input input-bordered w-full max-w-xs"
            onChange={handleEndDateChange}
          />
        </div>
        <button
          onClick={handleFilter}
          type="button"
          className="mx-4 text-primary btn btn-circle btn-secondary"
        >
          <MdCheck type="button" size={25} />
        </button>
      </div>
    </div>
  );
}

export default SelectDate;
