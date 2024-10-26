"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { useTranslation } from "@/hooks/useTranslation";

export const SkillText = () => {
  const {t} = useTranslation('home');
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="welcome-box p-2 border border-accent100 opacity-90"
      >
        <SparklesIcon className="text-electric-violet mr-2 h-5 w-5" />
        <h3 className="Welcome-text text-sm">
          {t('skills_title')}
        </h3>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-xl text-white font-medium mt-3 text-center mb-3"
      >
         {t('skills_description')}
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="text-lg text-gray-200 mb-10 mt-2 text-center"
      >
          {t('skills_caption')}
      </motion.div>
    </div>
  );
};
