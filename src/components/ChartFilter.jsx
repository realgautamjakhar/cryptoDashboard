import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../features/chartFilterSlice";
import { fetchChartData } from "../features/chartSlice";
const data = [
  {
    id: 1,
    value: 1,
    text: "1D",
  },
  {
    id: 2,
    value: 3,
    text: "3D",
  },
  {
    id: 3,
    value: 7,
    text: "7D",
  },
  {
    id: 4,
    value: 30,
    text: "1M",
  },
  {
    id: 5,
    value: 365,
    text: "1Y",
  },
];

const ChartFilter = () => {
  const filter = useSelector((state) => state.chartFilter.filter);
  const coin = useSelector((state) => state.chart.coin);
  const baseCurr = useSelector((state) => state.search.baseCurrency);
  const dispatch = useDispatch();
  const handleFilter = (item) => {
    dispatch(updateFilter(item.value));
  };
  useEffect(() => {
    const { id } = coin;
    dispatch(fetchChartData({ coin: id, baseCurr, filter }));
  }, [filter]);

  return (
    <ul className=" list-none flex gap-2 absolute top-4 right-4">
      {data.map((item) => {
        return (
          <li key={item.id}>
            <button
              className={`${
                filter === item.value
                  ? "bg-accent text-white"
                  : "bg-transparent"
              } px-2 py-1 text-xs border-2 border-accent/20 rounded-md`}
              onClick={() => handleFilter(item)}
            >
              {item.text}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ChartFilter;
