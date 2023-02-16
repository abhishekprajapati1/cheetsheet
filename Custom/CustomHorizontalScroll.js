// this component can be used to create automatic horizontal scroll in a div

import { useRef, useState, createElement, useEffect } from 'react'

const HorizontalScroll = ({ children, as }) => {
    const containerRef = useRef();

    const scrollX = e => {
        e.preventDefault();
        const scrollContainer = e.currentTarget; // containerRef is some how causing undesired behaviours.
        scrollContainer.scrollLeft += e.deltaY;
    };


    useEffect(() => {
        if (containerRef) {
            containerRef.current.addEventListener("wheel", scrollX, { passive: false }); // it is important to pass passive as false to override default event type in react.
        }

        
    }, [containerRef]);

    return createElement(
        as ? as : "div",
        {
            className: "dragscroll-container overflow-auto no-scrollbar", // the usefull class is no-scrollbar rest are self explainatory. see custom_scrollbar.css
            ref: containerRef,
        },
        children
    );
}

export default HorizontalScroll


// usage:

//....
<HorizontalScroll as = 'section'>
  <div>
    // this div has overflowing content in x axis
  </div>
</HorizontalScroll>
