import { useEffect, useRef } from 'react';
import 'animate.css';
import useOnScreen from './useOnScreen'; 


const AnimateOnscroll = ({ children, in_class, out_class, offset = "0px", duration }) => {
    /*
        include px in offset,
        duration should be in seconds without 's'
        in_class and out_class is an animate.css class.
    */


    const nodeRef = useRef();
    const isVisible = useOnScreen(nodeRef, offset);


    useEffect(() => {
        console.log(`It is ${isVisible ? "" : "not"} in viewport`);
        if (nodeRef.current) {
            if (isVisible) {
                nodeRef.current.classList.add(in_class);
            } else {
                if (out_class) {
                    nodeRef.current.classList.remove(in_class);
                    nodeRef.current.classList.add(out_class);
                } else {
                    nodeRef.current.classList.remove(in_class);
                }
            }
        }

    }, [isVisible]);

    return (
        <div
            ref={nodeRef}
            className={`animateWrapper w-fit h-fit animate__animated`}
            style={{
                ...(duration && { animationDuration: `${duration}s` })
            }}
        >
            {
                children
            }
        </div>
    )
}

export default AnimateOnscroll