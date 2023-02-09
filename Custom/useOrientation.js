// custom hook to get orientation of the device.

// for this to work as expected you need to include some css in your global css file [for react it should be index.js by default and for nextjs it would be global.css by default]

// css
/*
  @media screen and (orientation: portrait) {
  }
*/



import { useState, useEffect } from 'react'

const useOrientation = () => {
    const [orientation, setOrientation] = useState("portrait");
    
    useEffect(() => {
        let portrait = window.matchMedia("(orientation: portrait)");
        setOrientation(portrait.matches ? "portrait" : "landscape");
        portrait.addEventListener("change", (e) => {
            if(e.matches){
                setOrientation("portrait");
            }else{
                setOrientation("landscape");
            }
        })
    })
    return orientation;
}
export default useOrientation;
