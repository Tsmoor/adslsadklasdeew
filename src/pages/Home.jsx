import { motion } from "framer-motion";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl font-bold text-orange-400"
      >
        K-Gang Arena
      </motion.h1>
      <p className="mt-4 text-xl text-gray-300">
        Compete, Earn, Customize – Welcome to the ultimate KG experience.
      </p>
    </div>
  );
}
