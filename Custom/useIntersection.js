// this hook can be used to observe a dom node intersection on viewport.

import { useState, useEffect } from 'react'

const useIntersection = (ref) => {
    const [isIntersecting, setIntersecting] = useState(false);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting)
        );

        if(ref?.current){
            observer.observe(ref.current);
        }

    }, []);


    return isIntersecting;
}

export default useIntersection;
