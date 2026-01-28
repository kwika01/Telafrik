import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const childVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const PageTransition = ({ children, className }: PageTransitionProps) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInSection = ({ children, className }: PageTransitionProps) => {
  return (
    <motion.div
      variants={childVariants}
      initial="initial"
      whileInView="enter"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered list animation
interface StaggeredListProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const StaggeredList = ({ children, className }: StaggeredListProps) => {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredListItem = ({ children, className }: PageTransitionProps) => {
  return (
    <motion.div variants={listItemVariants} className={className}>
      {children}
    </motion.div>
  );
};

// Scale in animation for cards
export const ScaleIn = ({ children, className }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Hover card animation
interface HoverCardProps extends PageTransitionProps {
  hoverScale?: number;
  hoverY?: number;
}

export const HoverCard = ({ 
  children, 
  className,
  hoverScale = 1.02,
  hoverY = -4 
}: HoverCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: hoverScale, 
        y: hoverY,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
