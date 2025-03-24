import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  delay: number;
  styles?: string;
}

const AnimatedContainer = ({
  children,
  delay,
  styles,
}: AnimatedContainerProps) => {
  const variant = {
    hidden: {
      opacity: 0,
      x: 50,
      y: 100,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "tween",
        ease: "easeIn",
        duration: 0.5,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="show"
      className={styles}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
