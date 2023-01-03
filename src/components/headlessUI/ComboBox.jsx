import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";

export default function ComboxBox({ data, coin, update }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");

  const filteredCoins =
    query === ""
      ? data
      : data?.filter((coin) =>
          coin.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  function handleSelection(coin) {
    dispatch(update(coin));
  }
  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative ">
        <div className="relative w-full cursor-default overflow-hidden  bg-light text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:bg-dark sm:text-sm">
          <Combobox.Input
            className="w-full border-none bg-transparent py-2 pl-3 pr-10 text-base leading-5 text-lightPrimary focus:outline-none dark:text-DarkPrimary"
            displayValue={selected}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Select Coin"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="h-4 w-4 stroke-accent"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="custom-scroll absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-bgLightSecondary py-1 text-base bg-blend-hard-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-bgDarkSecondary sm:text-sm">
            {filteredCoins?.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-lightPrimary dark:text-DarkPrimary">
                Nothing found.
              </div>
            ) : (
              filteredCoins?.map((coin) => (
                <Combobox.Option
                  key={coin.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-accent/70 text-white"
                        : "text-lightPrimary dark:text-DarkPrimary"
                    } hover:cursor-pointer`
                  }
                  value={coin.name}
                  onClick={() => handleSelection(coin)}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {coin.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-accent/70"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-4 w-4 "
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
