import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChartData, updateCoin } from "../features/chartSlice";
const SearchResult = ({ data, setinput }) => {
  const dispatch = useDispatch();
  const baseCurr = useSelector((state) => state.search.baseCurrency);
  const filter = useSelector((state) => state.chartFilter.filter);

  function handleSearchClick(coin) {
    const { id } = coin;
    setinput("");
    dispatch(updateCoin(coin));
    dispatch(fetchChartData({ coin: id, baseCurr, filter }));
  }
  return (
    <ul className="absolute flex flex-col gap-2 top-16 custom-scroll bg-white rounded-md right-0 px-2 py-2 w-full max-h-[400px]  overflow-x-hidden overflow-y-scroll z-10">
      {data.coins?.map((coin) => {
        const { id, name, thumb } = coin;
        return (
          <li
            className=" grid grid-cols-[auto_1fr] items-center gap-4 py-4 px-4 hover:bg-accent/50 bg-accent/10  hover:text-white rounded-md cursor-pointer"
            key={id}
            onClick={() => handleSearchClick(coin)}
          >
            <img src={thumb} alt={name} />
            <p className=" line-clamp-1  justify-self-end">{name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResult;
