import React from 'react';
import { MdCheck } from 'react-icons/md';
import { useDate } from './providers/DatesContext';
import { useAlert } from './providers/AlertContext';

function SelectDate() {
  const { startDate, endDate, setStartDate, setEndDate, calculateNbDays } = useDate();
  const { showAlert } = useAlert();
  const today = new Date();
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(event.target.value);
    if (newStartDate.getTime() > today.getTime()) {
      setStartDate(newStartDate.toISOString().split('T')[0]);
    } else {
      showAlert(
        'error',
        `The date must be after ${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`,
        3000,
      );
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(event.target.value);
    const start = new Date(startDate);

    if (start.getTime() != newEndDate.getTime()) {
      setEndDate(newEndDate.toISOString().split('T')[0]);
    } else {
      showAlert('error', `The date must be after start date`, 3000);
    }
  };

  const handleFilter = () => {
    calculateNbDays();
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
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <span className="mx-4 text-primary">to</span>
        <div className="relative">
          <input
            name="end"
            type="date"
            className="input input-bordered w-full max-w-xs"
            value={endDate}
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
