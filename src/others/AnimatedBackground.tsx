import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <motion.div
      className="absolute inset-0 -z-10"
      animate={{ rotate: 360 }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 bg-gradient-to-tr from-[#1b0036] via-[#2f1fff] to-[#3b007a] blur-2xl opacity-90" />
    </motion.div>
  );
}
