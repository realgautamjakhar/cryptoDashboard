export const Staggercontainer = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.1,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const Staggeritem = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
  },
};

export const initialLoadAnimation = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween",
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};
