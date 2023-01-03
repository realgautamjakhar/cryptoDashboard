export const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerDirection: -1,
      staggerChildren: 0.5,
      type: "tween",
    },
  },
};

export const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};
