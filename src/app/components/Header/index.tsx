function Search() {
  return (
    <div className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 pt-0.5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        className="ml-2 outline-none bg-transparent"
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
      />
    </div>
  );
}

export function Header() {
  return (
    <header className="flex justify-between px-5 py-5 items-center bg-red-500">
      <h1 className="text-xl text-white font-bold">ぐるMeijo</h1>
      <Search />
    </header>
  );
}
