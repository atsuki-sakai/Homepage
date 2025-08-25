'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from '@/i18n/routing'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 0.98,
  },
}

const pageTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
}

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{
          willChange: 'transform, opacity',
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}