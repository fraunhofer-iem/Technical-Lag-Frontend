import React, { useEffect, useState } from 'react';

const useResize = (ref: React.RefObject<SVGSVGElement>) => {
    const [dimensions, setDimensions] = useState({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
    });

    const handleResize = () => {
        if (ref.current) {
            const boundingRect = ref.current.getBoundingClientRect();
            setDimensions({ width: boundingRect.width, height: boundingRect.height });
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [ref]);

    return dimensions;
};

export default useResize;
