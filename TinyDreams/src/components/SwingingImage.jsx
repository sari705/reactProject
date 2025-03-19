import { motion } from "framer-motion";

export default function SwingingImage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.img
        src="/logo/logo4.png" 
        alt="Swinging Image"
        className="w-48 h-48"
        animate={{
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
