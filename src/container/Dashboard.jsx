import Charts from "../components/Charts";
import Exchange from "../components/Exchange";
import Market from "../components/Market";
import Search from "../components/Search";
import Portfolio from "../components/Portfolio";
import { motion } from "framer-motion";
import { initialLoadAnimation, Staggeritem } from "../utils/animation";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  return (
    <motion.div
      variants={initialLoadAnimation}
      initial="hidden"
      animate="show"
      className="gridLayout bg-lightGradient transition-all duration-200 ease-in-out dark:bg-darkGradient"
    >
      <Toaster />
      <motion.div
        variants={Staggeritem}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="search z-10 mt-10 flex items-center justify-center md:mt-0 "
      >
        <Search />
      </motion.div>
      <motion.div variants={Staggeritem} className="marketcap">
        <Market />
      </motion.div>
      <motion.div variants={Staggeritem} className="chart">
        <Charts />
      </motion.div>
      <motion.div variants={Staggeritem} className="portfolio">
        <Portfolio />
      </motion.div>
      <motion.div variants={Staggeritem} className="exchange mb-10 md:mb-0">
        <Exchange />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
