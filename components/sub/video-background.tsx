import React from 'react';

const url = "https://res.cloudinary.com/drwgmpzuh/video/upload/v1726709398/videos/blackhole_vlnyv4.webm";
const VideoBackground = () => {
    return <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-0 left-0 w-full h-screen object-cover -z-20 pointer-events-none"
    >
        <source src={url} type="video/webm" />
    </video>;
};

export default VideoBackground;