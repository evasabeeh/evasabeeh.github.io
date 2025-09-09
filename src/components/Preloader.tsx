import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "@/styles/Container.module.css";

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
};

const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

const words = [
  "E",
  "V",
  "A",
  "S",
  "A",
  "B",
  "E",
  "E",
  "H",
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const updateDimension = useCallback(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    updateDimension();
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, [updateDimension]);

  useEffect(() => {
    if (index === words.length - 1) return;
    const timer = setTimeout(() => setIndex(index + 1), index === 0 ? 1000 : 150);
    return () => clearTimeout(timer);
  }, [index]);

  const getPath = useCallback(
    (extra = 0) =>
      `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
        dimension.width / 2
      } ${dimension.height + extra} 0 ${dimension.height}  L0 0`,
    [dimension]
  );

  const curve = {
    initial: {
      d: getPath(300),
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: getPath(0),
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          <motion.p variants={opacity} initial="initial" animate="enter">
            <span></span>
            {words[index]}
          </motion.p>
          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
