"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

import {
  slideInFromLeft,
  slideInFromTop,
} from "@/lib/motion";
import AstronautModel from "./astronaut-model";
import clsx from "clsx";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={clsx(
        "flex flex-row items-center justify-center relative",
        " px-5 sm:px-20 mt-40 w-full z-[20]"
      )}
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-purple-heart-8b opacity-[0.9]]"
        >
          <SparklesIcon className="text-electric-violet mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Frontend Developer Portfolio
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl text-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Providing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              the best
            </span>{" "}
            project experience.
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[650px]"
        >
          <TypeAnimation
            sequence={[
              "Hi there! I'am David Chan",
              1000,
              "A Frontend Developer",
              500,
              'I have experience with Reactjs',
              1000,
              'I have experience with Nextjs',
              1000,
              'I have experience with Nodejs',
              1000,
              'And Chrome Extension',
              1000,
              'Check out my projects and skills.',
              1000
            ]}
            wrapper="span"
            speed={30}
            style={{ height: '80px', lineHeight:'1em', fontSize: '2em', display: 'block' }}
            repeat={Infinity}
          />
        </motion.p>

        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          Learn more
        </motion.a>
      </div>
      
      <div className="w-screen h-[calc(100vh_+150px)] absolute top-[-150px] left-0 z-[-1]">
        <AstronautModel
          modelUrl="https://res.cloudinary.com/drwgmpzuh/image/upload/v1726755052/models/Cosmic_Adventure_0919140540_vgqw3g.glb"
        />
      </div>
    </motion.div>
  );
};
