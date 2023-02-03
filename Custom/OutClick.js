// how to identify click event happening outside of a particular container. Useful in handling custom modal and navigation bar close event.


const nav = useRef(); // reference to the container (in react). Can be a direct dom node reference useing getElement...



// for animated side navlist.
if (nav) {
  window.addEventListener("click", (e) => {
     if (!nav.current.contains(e.target) && !document.getElementById("hamIcon").contains(e.target)) {
         if (nav.current.classList.contains("anim-slideleft")) {
             nav.current.classList.remove("anim-slideleft");
         }
     }
  })
}

// If there are two different navigation component [for mobile and for largescreens]
// above will cause a reference glitch on window resize. [on real mobile devices it will not matter as they can not resize itself.
// though this cannot be neglected.
// so here is the solution trycatch :)


    React.useEffect(() => {
        if (window) {
            const windowClick = (e) => {
                try {
                    // remember we have a ref for side navbar. :)
                    if (!nav.current.contains(e.target) && !document.getElementById("hamIcon")?.contains(e.target)) {
                        if (nav.current.classList.contains("anim-slideleft")) {
                            nav.current.classList.remove("anim-slideleft");
                        }
                    }
                } catch (error) {
                    console.log(error); // in case you just want to checkout the errors.
                    return window.removeEventListener("click", windowClick); // removal of events that are no longer required is ideal :)
                }
            }

            window.addEventListener("click", (e) => windowClick(e));
        }


    }, [nav]);
