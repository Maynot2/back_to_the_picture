import React, { useEffect, useRef } from 'react';

var stylesArray = [
  {
    "stylers": [
      { "hue": "#121054" },
      { "saturation": -2 },
      { "lightness": -5 }
    ]
  },
{
  featureType: 'poi.park',
  elementType: 'geometry',
  stylers: [
    {color: '#00FF00'}
  ]
},
{
  featureType: 'water',
  elementType: 'geometry',
  stylers: [
    {color: '#031026'}
  ]
}]; 

const GMap = (props) => {
  const googleMapRef = useRef(null);
  let googleMap = useRef(null);

  /** Get spots and create cluster of markers */
  function createMarkersCluster(apiUrl){
    const spots = []
    fetch(apiUrl)
    .then((res) => res.json())
    .then((response) => {
      response.spots.map((obj, idx) => {
        spots[idx] = obj;
      })
      const markers = spots.map((obj) => {
        return new window.google.maps.Marker({
          position: {lat: Number(obj.latitude),lng: Number(obj.longitude)},
          map: googleMap.current
        });
      })
      new window.MarkerClusterer(googleMap.current, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      });
    }).catch((error) => console.log(error));
  }
  
  useEffect(() => {
    googleMap.current = initGoogleMap(props);

    /** Event map changed by the user */
    window.google.maps.event.addListener(googleMap.current, 'bounds_changed', function() {
      const minLatitude = googleMap.current.getBounds().oc.g;
      const maxLatitude = googleMap.current.getBounds().oc.i;
      const minLongitude = googleMap.current.getBounds().Eb.g;
      const maxLongitude = googleMap.current.getBounds().Eb.i;
      // createMarkersCluster('http://localhost:5000/api/spots');
      console.log('Min latitude = ', minLatitude, 'Max latitude = ', maxLatitude);
      console.log('Min longitude = ', minLongitude, 'Max longitude = ', maxLongitude);
    });
  }, [props]);

  // Temp location | Cf above don't burn Tibo' CB!!!
  createMarkersCluster('http://localhost:5000/api/spots');
 
  
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
      zoom: 8,
      styles: stylesArray
    });
  }
  return <div
    ref={googleMapRef}
    style={{ width: '100%', height: 500 }}
  />
}
 
export default GMap;