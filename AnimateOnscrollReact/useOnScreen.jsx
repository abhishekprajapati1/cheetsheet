import { useState, useEffect } from 'react'

const useOnScreen = (ref, offset) => {
    const [isIntersecting, setIntersecting] = useState(false);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting), { rootMargin: offset || 0 }
        );

        if (ref?.current) {
            observer.observe(ref.current);
        }

    }, []);


    return isIntersecting;
}

export default useOnScreen;