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
    <ul className="custom-scroll absolute top-16 right-0 z-10 flex max-h-[400px] w-full flex-col gap-2 overflow-x-hidden overflow-y-scroll rounded-md  bg-white py-2">
      {data.coins?.map((coin) => {
        const { id, name, thumb } = coin;
        return (
          <li
            className=" grid cursor-pointer grid-cols-[auto_1fr] items-center gap-4 bg-accent/10 py-4  px-4 hover:bg-accent/70 hover:text-white"
            key={id}
            onClick={() => handleSearchClick(coin)}
          >
            <img src={thumb} alt={name} />
            <p className=" justify-self-end  line-clamp-1">{name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResult;
