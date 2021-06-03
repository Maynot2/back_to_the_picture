import React, { useEffect, useRef } from 'react';
 
const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = useRef(null);
 
  useEffect(() => {
    googleMap.current = initGoogleMap();
    createMarker();
  }, []);
 
 
  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: 48.856614, lng: 2.3522219 },
      zoom: 8
    });
  }
 
  // create marker on google map
  const createMarker = () => new window.google.maps.Marker({
    position: { lat: 48.856614, lng: 2.3522219 },
    map: googleMap.current
  });
 
  return <div
    ref={googleMapRef}
    style={{ width: 600, height: 500 }}
  />
}
 
export default GMap;