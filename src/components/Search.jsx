import React from "react";
import { useState } from "react";
import BaseCurrency from "./BaseCurrency";
import SearchResult from "./SearchResult";
import { useSelector, useDispatch } from "react-redux";
import { fetchBestMatches } from "../features/searchSlice";
import ThemeToggle from "./ThemeToggle";
import { AnimatePresence } from "framer-motion";
import { debounce } from "../utils/debounce";
import { useEffect } from "react";

const Search = () => {
  const [input, setinput] = useState("");
  const bestMatches = useSelector((state) => state.search.bestMatches);
  const dispatch = useDispatch();

  //Fetch all the related coin to the search input
  //Reason = Making a search api call because coin list is very large and hard to render to the ui if you are pre fetching at the first render
  const fetchdata = async () => {
    dispatch(fetchBestMatches(input));
  };

  // const data = debounce(() => fetchdata(input), 2000);
  // useEffect(() => {
  //   data();
  // }, [input]);
  return (
    <div className=" relative flex w-full max-w-[600px] rounded-[50px] bg-light  px-4  py-2 shadow-shadow1 dark:border-2 dark:border-accent dark:bg-dark dark:shadow-none">
      <BaseCurrency />
      <input
        type="text"
        name="input"
        id="input"
        className="w-full bg-transparent px-4 py-2 text-lightPrimary placeholder:text-lightSecondary focus:outline-none dark:text-DarkPrimary placeholder:dark:text-DarkSecondary "
        placeholder="Search Crypto  "
        value={input}
        onChange={(e) => setinput(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            fetchdata();
          }
        }}
      />

      {input && (
        <button className="pr-2" onClick={() => setinput("")} title="Clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            className="h-6 w-6 stroke-accent"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      <button onClick={() => fetchMatches()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          className="h-6 w-6 stroke-accent/70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
      <AnimatePresence>
        {input.length > 0 && bestMatches?.coins?.length > 0 && (
          <SearchResult setinput={setinput} data={bestMatches} />
        )}
      </AnimatePresence>

      {/* <ThemeToggle /> */}
    </div>
  );
};

export default Search;
