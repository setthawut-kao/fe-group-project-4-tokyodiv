import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Typography } from "../ui/typography";

import splashAnimationData from "@/assets/animations/splash_animation.json";

export const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="flex flex-col justify-center items text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <Lottie
            animationData={splashAnimationData}
            loop={false}
            className="w-120"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Typography as="h2">Welcome to Re:furnish</Typography>
        </motion.div>
      </div>
    </motion.div>
  );
};
