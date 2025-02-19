import { useState, useEffect } from 'react';

export const useMediaQuery = (maxWidth: number = 1024): boolean => {
    const [isMedia, setIsMedia] = useState<boolean>(() =>
        typeof window !== 'undefined' ? window.innerWidth <= maxWidth : false
    );

    useEffect(() => {
        const handleResize = () => setIsMedia(window.innerWidth <= maxWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [maxWidth]);

    return isMedia;
};
