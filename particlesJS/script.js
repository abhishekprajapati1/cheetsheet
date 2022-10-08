let linkedConfig = {
    "enable": false, // enable it if you want to link the particles.
    "distance": 150, // link when the minimum distance is 150 px
    "color": "#ffffff", // color of linking line
    "opacity": 0.4,
    "width": 1
}




function linkerReducer(state=linkedConfig, action){
    switch (action.type) {
        case "toggle":
            if(state.enable){
                return {...state, enable: false}
            }else{
                return {...state, enable: true}
            }
        
        default:
            return state;
    }
}
const store = Redux.createStore(linkerReducer);

function render(){
    const state = store.getState(); // returns the current store state.
    particlesJS("particle", {
        "particles": {
            number: {
                value: 200,
                density: {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                value: "#ffffff"
            },
            "shape": {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked":state,
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
    
    
        // ignore following property for now
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "ratina_detect": true
    
    
    })
}

render();
store.subscribe(render);

const buttonElem = document.getElementById("linkthem");
buttonElem.addEventListener("click", ()=>{
    store.dispatch({type: "toggle"})
}) 