// src/hooks/useDeviceWidth.ts
import { throttle } from '@/utilities';
import { useState, useEffect } from 'react';

const useDeviceWidth = () => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    const throttledHandleResize = throttle(handleResize, 300);

    useEffect(() => {

        // Set initial width
        throttledHandleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { width, height };
};

export default useDeviceWidth;