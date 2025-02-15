import { useRef } from "react";
import { useSearchParams } from "react-router";

export default function SearchNotes() {
  const [, setSearchParams] = useSearchParams();

  const searchNoteInputRef = useRef();

  const handleSearch = (searchQuery) => {
    return;
    // const updatedQueryParams = setQueryParam("search", searchQuery);
    // setSearchParams(updatedQueryParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = searchNoteInputRef.current.value;
    handleSearch(searchQuery);
  };

  const handleChange = () => {
    const searchQuery = searchNoteInputRef.current.value;
    if (!searchQuery) handleSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center h-8 border border-gray-500 rounded-md"
    >
      <input
        type="search"
        autoComplete="off"
        id="search-products"
        name="search-products"
        onChange={handleChange}
        ref={searchNoteInputRef}
        placeholder="Search Note"
        className="w-full p-2 outline-none"
      />

      <button
        type="submit"
        className="flex items-center justify-center w-10 h-full p-2 bg-gray-400"
      >
        <img alt="search icon" className="size-full" src="icons/search.svg" />
      </button>
    </form>
  );
}
