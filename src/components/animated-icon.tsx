import { motion } from "motion/react";

export default function AnimatedIcon({
  children,
  delay = 0
}: Readonly<{
  children: React.ReactNode,
  delay?: number
}>) {
  return (
    <motion.span
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: .75 }}
      transition={{
        duration: 0.5,
        type: "spring",
        delay: delay, stiffness: 100
      }}>
      {children}
    </motion.span>
  )
};