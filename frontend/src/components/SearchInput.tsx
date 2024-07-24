import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MdSearch } from 'react-icons/md';
import qs from 'query-string';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const searchParams = qs.parse(window.location.search) as any;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/products?${qs.stringify({
        ...searchParams,
        title: search,
      })}`,
    );
  };

  useEffect(() => {
    if (typeof router.query.title === 'string') {
      setSearch(router.query.title);
    }
  }, [router.query.title]);

  return (
    <form
      className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 m-3"
      onSubmit={handleSearch}
    >
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          id="simple-search"
          className="input input-bordered w-full max-w-xs  text-gray-400"
          placeholder="Search products..."
          value={search}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="text-primary btn btn-circle btn-secondary sm:mt-0 mt-4">
        <MdSearch size={25} />
      </button>
    </form>
  );
};

export default SearchInput;
