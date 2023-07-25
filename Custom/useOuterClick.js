import React, { useEffect } from "react";
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

const useOuterClick = (ref, toggleRef, setter) => {
  
  const handleClick = (event) => {
    console.log(ref, toggleRef);
    console.log(elementIsVisibleInViewport(ref?.current))
    if(ref.current && !ref.current.contains(event.target) && !toggleRef?.current.contains(event.target)){
      setter(false)
    } 
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  
};

export default useOuterClick;
