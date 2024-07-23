import React from 'react';
import { MdCheck } from 'react-icons/md';
import { useDate } from './hooks/DatesContext';
import { useAlert } from './hooks/AlertContext';

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
    <div className="flex items-center justify-center space-x-4">
      <div className="relative">
        <input
          name="start"
          type="date"
          className="input input-bordered w-full max-w-xs text-gray-400"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <span className="text-primary">to</span>
      <div className="relative">
        <input
          name="end"
          type="date"
          className="input input-bordered w-full max-w-xs text-gray-400"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      <button
        onClick={handleFilter}
        type="button"
        className="text-primary btn btn-circle btn-secondary ml-4"
      >
        <MdCheck size={25} />
      </button>
    </div>
  );
}

export default SelectDate;
