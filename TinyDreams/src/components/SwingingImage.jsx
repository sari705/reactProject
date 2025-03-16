import { motion } from "framer-motion";

export default function SwingingImage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.img
        src="/logo/logo4.png" // כאן תחליפי לתמונה שלך
        alt="Swinging Image"
        className="w-48 h-48"
        animate={{
          rotate: [-10, 10, -10], // תנועה מצד לצד
        }}
        transition={{
          duration: 2, // משך הזמן למחזור שלם
          repeat: Infinity, // חזרה אינסופית
          ease: "easeInOut", // תנועה חלקה
        }}
      />
    </div>
  );
}
