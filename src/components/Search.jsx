import React from "react";
import { useState } from "react";
import BaseCurrency from "./BaseCurrency";
import SearchResult from "./SearchResult";
import { useSelector, useDispatch } from "react-redux";
import { fetchBestMatches } from "../features/searchSlice";
const Search = () => {
  const [input, setinput] = useState("");
  const bestMatches = useSelector((state) => state.search.bestMatches);

  const dispatch = useDispatch();

  //Fetch all the related coin to the search input
  const fetchMatches = async () => {
    dispatch(fetchBestMatches(input));
  };
  return (
    <>
      <div className="max-w-[600px] w-full relative flex px-4 py-2 rounded-md border-2 border-accent/60">
        <BaseCurrency />
        <input
          type="text"
          name="input"
          id="input"
          className="w-full px-4 py-2 focus:outline-none bg-transparent"
          placeholder="Search Crypto"
          value={input}
          onChange={(e) => setinput(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              fetchMatches();
            }
          }}
        />
        <button onClick={() => fetchMatches()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>

        {input && bestMatches && (
          <SearchResult setinput={setinput} data={bestMatches} />
        )}
      </div>
    </>
  );
};

export default Search;
