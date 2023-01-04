import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../features/chartFilterSlice";
import { fetchChartData } from "../features/chartSlice";
import { motion } from "framer-motion";
import { Staggercontainer, Staggeritem } from "../utils/animation";

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
    <motion.ul
      variants={Staggercontainer}
      initial="hidden"
      animate="show"
      className="absolute right-0 top-0 flex gap-2"
    >
      {data.map((item) => {
        return (
          <motion.li variants={Staggeritem} key={item.id}>
            <button
              className={`${
                filter === item.value
                  ? "bg-accent text-white "
                  : "bg-transparent"
              }  rounded-md px-2 py-1 text-xs`}
              onClick={() => handleFilter(item)}
            >
              {item.text}
            </button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default ChartFilter;
