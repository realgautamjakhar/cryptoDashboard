import Charts from "../components/Charts";
import Exchange from "../components/Exchange";
import Market from "../components/Market";
import Search from "../components/Search";
import Portfolio from "../components/Portfolio";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <>
      <section className="gridLayout bg-light dark:bg-dark">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
            y: -200,
          }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="search z-10 flex items-center justify-center"
        >
          <Search />
        </motion.div>
        <div className="marketcap">
          <Market />
        </div>
        <div className="chart">
          <Charts />
        </div>
        <div className="portfolio">
          <Portfolio />
        </div>
        <div className="exchange">
          <Exchange />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
