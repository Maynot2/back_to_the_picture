import React, { useEffect, useRef } from 'react';
 
const GMap = (props) => {
  const googleMapRef = useRef(null);
  let googleMap = useRef(null);
 
  useEffect(() => {
    googleMap.current = initGoogleMap(props);
    createMarker(props);
  }, [props]);
 
 
  // initialize the google map
  const initGoogleMap = (props) => {
    var latitude = 48.856614;
    var longitude = 2.3522219;
    if (props.place) {
      latitude = props.place.geometry.location.lat();
      longitude = props.place.geometry.location.lng();
    }

    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 8
    });
  }
 
  // create marker on google map
  const createMarker = (props) => {
    var latitude = 48.856614;
    var longitude = 2.3522219;
    if (props.place) {
      latitude = props.place.geometry.location.lat();
      longitude = props.place.geometry.location.lng();
    }

    new window.google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: googleMap.current
  })};
 
  return <div
    ref={googleMapRef}
    style={{ width: 600, height: 500 }}
  />
}
 
export default GMap;