import React from "react";
import { useState } from "react";

const DropDown = ({ data, input, setinput }) => {
  const [isOpen, setisOpen] = useState(false);
  function handleisOpen(e) {
    setinput(e.target.value);
    setisOpen(true);
    document.addEventListener("click", (e) => MouseClick(e));
  }

  function MouseClick(e) {
    if (e.target.id != "dropdown") {
      setisOpen(false);
      document.removeEventListener("click", MouseClick);
    }
  }
  function handleSelection(crypto) {
    setinput(crypto.name);
    setisOpen(false);
  }
  return (
    <div className="max-w-[200px] relative flex items-center px-2 border-2 ">
      <input
        className="py-2 text-base focus:outline-none w-full bg-transparent "
        type="text"
        onChange={(e) => handleisOpen(e)}
        value={input}
      />

      {isOpen ? (
        <button onClick={() => setisOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeWidth={2}
            className="w-5 h-6 stroke-accent"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      ) : (
        <button onClick={() => setisOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeWidth={2}
            className="w-5 h-5 stroke-accent bg-white "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      )}

      {input && isOpen ? (
        <ul
          id="dropdown"
          className="absolute bg-white overflow-x-hidden top-14 h-28  grid gap-2 left-0 custom-scroll overflow-y-scroll w-full z-50"
        >
          {data
            ?.filter((crypto) =>
              crypto.name.toLowerCase().includes(input.toLowerCase())
            )
            ?.map((crypto) => {
              const { name, id } = crypto;
              return (
                <li
                  key={id}
                  className="bg-white w-full px-2 py-2 text-xs cursor-pointer hover:bg-accent/50 hover:text-white"
                  onClick={() => handleSelection(crypto)}
                >
                  {name}
                </li>
              );
            })}
        </ul>
      ) : null}
    </div>
  );
};

export default DropDown;
