import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const DropDown = ({ data, coin, update }) => {
  const dispatch = useDispatch();
  const [input, setinput] = useState();
  const [isOpen, setisOpen] = useState(false);
  function handleisOpen(e) {
    setisOpen(true);
    setinput(e.target.value);
    document.addEventListener("click", (e) => MouseClick(e));
  }

  function MouseClick(e) {
    if (e.target.id != "dropdown") {
      setisOpen(false);
      document.removeEventListener("click", MouseClick);
    }
  }
  function handleSelection(coin) {
    dispatch(update(coin));
    setinput(coin.name);
    setisOpen(false);
  }
  return (
    <div className="relative flex max-w-[200px] items-center border-2 px-2 ">
      <input
        className="w-full bg-transparent py-2 text-base focus:outline-none "
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
            className="h-6 w-5 stroke-accent"
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
            className="h-5 w-5 bg-white stroke-accent "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      )}

      {isOpen ? (
        <ul
          id="dropdown"
          className="custom-scroll absolute top-14 left-0 z-50  grid h-28 w-full gap-2 overflow-x-hidden overflow-y-scroll bg-white"
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
                  className="w-full cursor-pointer bg-white px-2 py-2 text-xs hover:bg-accent/50 hover:text-white"
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
