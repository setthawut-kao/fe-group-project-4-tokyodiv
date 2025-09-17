import { motion } from "framer-motion";

export const ScrollReveal = ({
  children,
  className,
  duration = 0.8,
  delay = 0,
  once = true,
  amount = 0.2,
  direction = "up",
}) => {
  const offset = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  };

  const revealVariants = {
    hidden: { opacity: 0, ...offset[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
};
