'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

// Apple-inspired seamless transition with overlapping phases
const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    filter: 'blur(4px)',
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  out: {
    opacity: 0,
    y: -24,
    scale: 0.96,
    filter: 'blur(4px)',
  },
}

// Apple-style timing with overlapping phases for seamless feel
const pageTransition = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  opacity: { 
    duration: 1.0,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
  },
  scale: {
    duration: 0.9,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
  },
  filter: {
    duration: 0.7,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
  },
  y: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
  }
}


export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className="w-full">{children}</div>
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{
        willChange: 'transform, opacity, filter',
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}