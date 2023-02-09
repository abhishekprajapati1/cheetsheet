import React from 'react';


function handlePermission() {
    navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
            if (result.state === "granted") {
                // console.log(result.state);
                return true;
            } else if (result.state === "prompt") {
                // console.log(result.state);
                return false
            } else if (result.state === "denied") {
                
            }
            result.onchange = function () {
                console.log(result.state);
            }
        });
}


const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
}

const useGeoLoacation = ({ address = null }) => {
    const [locationInfo, setLocationInfo] = React.useState({
        lat: null,
        long: null,
    });


    React.useEffect(() => {
        const getPosition = (position) => {
            setLocationInfo({
                lat: position?.coords?.latitude,
                long: position?.coords?.longitude,
            });
        }

        const getErrors = (error) => {
            setLocationInfo(null);
        }




        if (!address && navigator.geolocation) {
            let hasAllowed = handlePermission();
            console.log(hasAllowed);
            if (hasAllowed === "blocked") {
                console.log("You have blocked sharing location");
                setLocationInfo(hasAllowed);
            } else {
                if (!hasAllowed) {
                    navigator.geolocation.getCurrentPosition(getPosition, getErrors, options);
                } else {
                    navigator.geolocation.getCurrentPosition(getPosition)
                }
            }
        }
    }, []);


    return locationInfo
}

export default useGeoLoacation;
