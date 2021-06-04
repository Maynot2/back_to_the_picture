import React, { useEffect, useRef } from 'react';
 
const GMap = (props) => {
  const googleMapRef = useRef(null);
  let googleMap = useRef(null);

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
			{color: '#000000'}
		]
	}
];
  useEffect(() => {
    googleMap.current = initGoogleMap(props);
    createMarker(props);
    //event zoom_changed
    window.google.maps.event.addListener(googleMap.current, 'bounds_changed', function() {
      const minLatitude = googleMap.current.getBounds().oc.g;
      const maxLatitude = googleMap.current.getBounds().oc.i;
      const minLongitude = googleMap.current.getBounds().Eb.g;
      const maxLongitude = googleMap.current.getBounds().Eb.i;
      console.log(googleMap.current.getBounds());
      console.log('Min latitude = ', minLatitude, 'Max latitude = ', maxLatitude);
      console.log('Min longitude = ', minLongitude, 'Max longitude = ', maxLongitude);

      // console.log('center->', googleMap.current.getCenter().lat());
    });


    // googleMap.current.addListener("click", (mapsMouseEvent) => {
    //     // Close the current InfoWindow.
    //     // Create a new InfoWindow.
    //     new window.google.maps.Marker({
    //       position: { lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng() },
    //       map: googleMap.current
    //     });
       
    // });
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
      zoom: 8,
      styles: stylesArray
    });
  }
 
 
 
  return <div
    ref={googleMapRef}
    style={{ width: 600, height: 500 }}
  />
}
 
export default GMap;