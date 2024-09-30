"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box p-2 border border-purple opacity-90"
      >
        <SparklesIcon className="text-electric-violet mr-2 h-5 w-5" />
        <h3 className="Welcome-text text-sm">
          Think better with Next.js 14
        </h3>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-xl text-white font-medium mt-3 text-center mb-3"
      >
        Making apps with modern technologies.
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-lg text-gray-200 mb-10 mt-2 text-center"
      >
        Never miss a task, deadline or idea.
      </motion.div>
    </div>
  );
};
