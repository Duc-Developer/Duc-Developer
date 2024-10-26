"use client";
import { throttle } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaDownload, FaRedo } from "react-icons/fa";

const audioLink = "https://res.cloudinary.com/drwgmpzuh/video/upload/v1727858091/david.id.vn/avangard_phonk.mp3";
const backgroundUrl = "https://res.cloudinary.com/drwgmpzuh/image/upload/v1727670340/david.id.vn/3d-rendering-astronaut_23-2151432351_rhcdd5.webp";

const AUDIO = {
    title: "Avangard Phonk",
    artist: "Remix by Avangard",
    mapper: "Avangard",
    likes: '2k',
    plays: '75k',
    date: "25 Sep 2024",
    link: audioLink
};

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePlay = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleDownload = async (e: any) => {
        e.stopPropagation();
        try {
            const response = await fetch(AUDIO.link);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "lofi-song-jinsei-by-lofium.mp3";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };

    const handleTimeUpdate = throttle((e) => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setProgress((currentTime / duration) * 100);
        }
    }, 500);

    const handleReset = (loop: boolean) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = 0;
        setProgress(0);
        if (!loop) {
            setIsPlaying(false);
            return;
        }
        if (isPlaying) {
            audioRef.current.play();
        }
    };

    const resetAudio = () => { handleReset(false) };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('ended', resetAudio);
            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('ended', resetAudio);
            };
        }
    }, []);

    return (
        <div className="flex w-full max-w-xl items-center justify-center">
            <article className="group relative flex h-[12rem] w-full overflow-hidden rounded-2xl bg-astronaut200">
                <aside className="absolute right-0 flex h-full flex-col justify-center space-y-8 p-3">
                    <FaRedo onClick={() => handleReset(true)} className='cursor-pointer active:scale-110' />
                    <FaDownload onClick={handleDownload} className='cursor-pointer active:scale-110' />
                </aside>
                <div className="absolute inset-y-0 left-0 w-48">
                    <div style={{
                        backgroundImage: `url(${backgroundUrl})`
                    }}
                        className='h-full w-full bg-cover bg-center'
                    />
                    <div className="invisible absolute inset-0 flex h-full w-full items-center justify-center bg-black100/70 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                        {
                            isPlaying
                                ? <FaPause className='cursor-pointer' size={30} onClick={handlePlay} />
                                : <FaPlay className='cursor-pointer' size={30} onClick={handlePlay} />
                        }
                    </div>
                </div>
                <div className="absolute inset-y-0 left-44 w-[26rem] overflow-hidden rounded-2xl transition-all group-hover:w-[23rem]">
                    <div style={{ backgroundImage: `url(${backgroundUrl})` }} className="h-full w-full bg-cover bg-center">
                        <div className="h-full w-full bg-white300/80 transition-all group-hover:bg-black300/80" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                        <div className="space-y-1">
                            <div className="text-3xl font-medium">{AUDIO.title}</div>
                            <div className="font-medium">{AUDIO.artist}</div>
                            <div className="text-sm">
                                mapped by {" "}
                                <span className="text-black100 italic transition-all hover:text-accent300">{AUDIO.mapper}</span>
                            </div>
                        </div>
                        <div className="invisible flex space-x-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                            <span className="flex items-center space-x-1">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <div>{AUDIO.likes}</div>
                            </span>
                            <span className="flex items-center space-x-1">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>{AUDIO.plays}</div>
                            </span>
                            <span className="flex items-center space-x-1">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>{AUDIO.date}</div>
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <span className="rounded-full bg-black100 px-2 font-medium text-white">RANKED</span>
                            <div className="flex items-center space-x-1">
                                <span className="h-5 w-2 rounded-full bg-red100" />
                                <span className="h-5 w-2 rounded-full bg-green100" />
                                <span className="h-5 w-2 rounded-full bg-yellow" />
                            </div>
                        </div>
                        <div className="w-[calc(100%_-_1em)] h-1 bg-gray-300 rounded-full mt-4 relative">
                            <div
                                className="h-full bg-primary100 rounded-full absolute top-0 left-0 transition-all"
                                style={{ width: `${progress}%` }}
                            />
                            {isPlaying && <div
                                className="h-3 w-3 bg-primary100 rounded-full absolute top-[-0.8rem] transition-all transform -translate-x-1/2"
                                style={{ left: `calc(${progress}% - 0.35rem)`, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)' }}
                            >
                                <div
                                    className="absolute h-2 w-2 bg-primary100 rounded-full top-[0.1rem] left-0"
                                    style={{ borderRadius: '50%' }}
                                />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </article>
            <audio ref={audioRef} src={audioLink} className='hidden' />

        </div>
    );
};

export default AudioPlayer