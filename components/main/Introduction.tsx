"use client";

import { useEffect, useRef } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
    slideInFromLeft,
    slideInFromTop,
} from "@/lib/motion";
import { classNames } from "@/lib/utils";
import AudioPlayer from "../sub/audio-player";
import { Skills } from "./skills";
import { Projects } from "./projects";
import { useSearchParams } from "next/navigation";

const AboutMe = () => {
    return <>
        <motion.div
            variants={slideInFromTop}
            className="welcome-box py-[8px] px-[7px] border border-accent100 opacity-90"
        >
            <SparklesIcon className="text-electric-violet mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-sm">
                Software Engineer Portfolio
            </h1>
        </motion.div>

        <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-6 mt-6 text-5xl md:text-6xl text-bold text-white max-w-[calc(100vw_-_2rem)] sm:max-w-xl w-auto h-auto"
        >
            <span className="text-4xl md:text-6xl">
                Providing<br/>
                <span className="text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue">
                    the best
                </span><br/>
                project experience.
            </span>
        </motion.div>

        <motion.p
            variants={slideInFromLeft(0.8)}
            className="md:text-lg text-gray-400 my-5 max-w-[calc(100vw_-_2rem)] sm:max-w-[650px]"
        >
            <TypeAnimation
                sequence={[
                    "Hi there! I'm David Chan",
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
                style={{ height: '80px', lineHeight: '1em', fontSize: '2em', display: 'block' }}
                repeat={Infinity}
            />
        </motion.p>
    </>;
};

const Slider = () => {
    const searchParams = useSearchParams();
    const activeSlide = searchParams?.get('active');
    const slideRef = useRef<any>(null);

    useEffect(() => {
        if(!slideRef.current) return;
        let slideIndex = 0;
        if (activeSlide) {
            slideIndex = ['about-me', 'skills', 'projects'].indexOf(activeSlide);
        }
        if (slideIndex !== -1) {
            slideRef.current.slideTo(slideIndex);
        }
    }, [activeSlide]);

    return <div className="introduction_slider">
        <Swiper
            direction='vertical'
            className="mySwiper h-[28rem]"
            onSwiper={(swiper) => slideRef.current = swiper}
        >
            <SwiperSlide><AboutMe /></SwiperSlide>
            <SwiperSlide><Skills /></SwiperSlide>
            <SwiperSlide><Projects /></SwiperSlide>
        </Swiper>
    </div>;
};

export const Introduction = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className={classNames(
                "flex flex-col sm:flex-row items-center justify-center relative",
                "px-5 sm:px-20 w-full h-full"
            )}
        >
            <div className="h-full w-full sm:w-auto flex flex-col gap-5 justify-center m-auto text-start">
                <Slider />
                <motion.div className="my-4 grow flex flex-col justify-end">
                    <AudioPlayer />
                </motion.div>
            </div>
        </motion.div>
    );
};
