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
