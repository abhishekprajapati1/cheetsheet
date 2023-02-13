// this hook can be used to observe a dom node intersection on viewport.

import { useState, useEffect } from 'react'

const useIntersection = (ref, offset) => { // ref is element ref and offset is the intersection-delay in pixels
    const [isIntersecting, setIntersecting] = useState(false);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting),
            {
                rootMargin: offset || "0px"
            }
        );

        if(ref?.current){
            observer.observe(ref.current);
        }

    }, []);


    return isIntersecting;
}

export default useIntersection;
