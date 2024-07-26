import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MdKeyboardArrowUp, MdSearch } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useDate } from './hooks/DatesContext';
import { useAlert } from './hooks/AlertContext';
import qs from 'query-string';

const SearchBar = () => {
  const { startDate, endDate, setStartDate, setEndDate, calculateNbDays } = useDate();
  const { showAlert } = useAlert();
  const today = new Date();
  const [search, setSearch] = useState('');
  const router = useRouter();
  const searchParams = qs.parse(window.location.search) as any;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');

    if (storedStartDate) {
      setStartDate(storedStartDate);
    }
    if (storedEndDate) {
      setEndDate(storedEndDate);
    }

    if (typeof router.query.title === 'string') {
      setSearch(router.query.title);
    }
  }, [router.query.title, setStartDate, setEndDate, calculateNbDays]);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(event.target.value);
    if (newStartDate.getTime() > today.getTime()) {
      const formattedDate = newStartDate.toISOString().split('T')[0];
      setStartDate(formattedDate);
      localStorage.setItem('startDate', formattedDate);
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

    if (start.getTime() != newEndDate.getTime() && newEndDate.getTime() > start.getTime()) {
      const formattedDate = newEndDate.toISOString().split('T')[0];
      setEndDate(formattedDate);
      localStorage.setItem('endDate', formattedDate);
    } else {
      showAlert('error', `The date must be after start date`, 3000);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nbDays = calculateNbDays(); // Correct usage without arguments
    localStorage.setItem('nbDays', nbDays.toString());
    setSearch(e.target.value);
  };

  const handleFilter = () => {
    calculateNbDays();
    router.push(
      `/products?${qs.stringify({
        ...searchParams,
        title: search,
        startDate,
        endDate,
      })}`,
    );
  };

  return (
    <>
      <div className="text-primary btn-secondary pb-2 ml-0 sm:hidden">
        {show ? (
          <MdKeyboardArrowUp
            size={25}
            onClick={(e) => {
              e.preventDefault();
              setShow(!show);
            }}
          />
        ) : (
          <MdKeyboardArrowDown
            size={25}
            onClick={(e) => {
              e.preventDefault();
              setShow(!show);
            }}
          />
        )}
      </div>
      <form
        className={`flex items-center space-x-4 w-full ${show ? 'block' : 'hidden'} sm:flex`}
        onSubmit={(e) => {
          e.preventDefault();
          handleFilter();
        }}
      >
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            id="simple-search"
            className="input input-bordered w-full text-gray-400"
            placeholder="Search products..."
            value={search}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full sm:max-w-xs">
          <input
            name="start"
            type="text"
            className="input input-bordered w-full text-gray-400"
            value={startDate}
            onChange={handleStartDateChange}
            onFocus={(e) => {
              e.target.type = 'date';
              e.target.showPicker && e.target.showPicker();
            }}
            onBlur={(e) => (e.target.type = 'text')}
            placeholder="Start Date"
          />
        </div>
        <div className="relative w-full sm:max-w-xs">
          <input
            name="end"
            type="text"
            className="input input-bordered w-full text-gray-400"
            value={endDate}
            onChange={handleEndDateChange}
            onFocus={(e) => {
              e.target.type = 'date';
              e.target.showPicker && e.target.showPicker();
            }}
            onBlur={(e) => (e.target.type = 'text')}
            placeholder="End Date"
          />
        </div>

        <button type="submit" className="text-primary btn btn-circle btn-secondary ml-0 sm:ml-4">
          <MdSearch size={25} />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
