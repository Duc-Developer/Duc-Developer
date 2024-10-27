import { classNames } from '@/lib/utils';
import React from 'react';

const url = "https://res.cloudinary.com/drwgmpzuh/video/upload/v1726709398/videos/blackhole_vlnyv4.webm";
const VideoBackground = ({className}: {className?: string}) => {
    return <video
        autoPlay
        muted
        loop
        className={classNames(
            "hidden md:block rotate-180 absolute md:top-0 left-0 w-full h-screen",
            "object-cover -z-20 pointer-events-none",
            className
        )}
    >
        <source src={url} type="video/webm" />
    </video>;
};

export default VideoBackground;