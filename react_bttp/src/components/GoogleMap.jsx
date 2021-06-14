import React, { useEffect, useRef, useState } from "react";

var stylesArray = [
  {
    stylers: [{ hue: "#121054" }, { saturation: -2 }, { lightness: -5 }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#00FF00" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#031026" }],
  },
];

const GMap = (props) => {
  const googleMapRef = useRef(null);
  let googleMap = useRef(null);

  /** Get spots and create cluster of markers */
  function createMarkersCluster(apiUrl) {
    const spots = [];
    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        response.forEach((obj, idx) => {
          spots[idx] = obj;
        });
        const markers = spots.map((obj) => {
          return new window.google.maps.Marker({
            position: { lat: Number(obj.latitude), lng: Number(obj.longitude) },
            map: googleMap.current,
            albums: obj.albums,
          });
        });
        new window.MarkerClusterer(googleMap.current, markers, {
          imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        });
        markers.forEach((marker) => {
          marker.addListener("click", function () {
            const tmpObjPositionMarker = {};
            tmpObjPositionMarker["lat"] = this.position.lat();
            tmpObjPositionMarker["lng"] = this.position.lng();
            // Update latitude - Longitude of the map to center on the marker selected to overwrite the search bar entered
            props.setAddressPlaceSelected(tmpObjPositionMarker);
            console.log("marker:", this);
            if (props.isSearchPic) {
              props.setAlbums(this.albums);
            } else {
              const takenAt = props.datePicked.taken;
              const albums = [];
              this.albums.forEach((album) => {
                // Add condition for user here
                if (
                  takenAt.toISOString().split("T")[0] ===
                  album.takenAt.split("T")[0]
                ) {
                  albums.push(album);
                }
              });
              console.log(albums);
              props.setAlbums(albums);
            }
          });
        });
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    googleMap.current = initGoogleMap(props);

    /** Event map changed by the user */
    window.google.maps.event.addListener(
      googleMap.current,
      "bounds_changed",
      function () {
        // props.setAddressPlaceSelected({})
        const minLatitude = googleMap.current.getBounds().lc.g;
        const maxLatitude = googleMap.current.getBounds().lc.i;
        const minLongitude = googleMap.current.getBounds().Eb.g;
        const maxLongitude = googleMap.current.getBounds().Eb.i;
        let minDate;
        let maxDate;
        if (props.isSearchPic) {
          minDate = props.datePicked.from.toISOString().split("T")[0];
          maxDate = props.datePicked.to.toISOString().split("T")[0];
        } else {
          minDate = new Date(0).toISOString().split("T")[0];
          maxDate = new Date().toISOString().split("T")[0];
        }
        const takenAt = props.datePicked.taken.toISOString().split("T")[0];

        const url = `http://localhost:5000/api/spots?min_latitude=${minLatitude}&max_latitude=${maxLatitude}&min_longitude=${minLongitude}&max_longitude=${maxLongitude}&min_date=${minDate}&max_date=${maxDate}`;

        createMarkersCluster(url);
      }
    );
  }, [props]);

  // Temp location | Cf above don't burn Tibo' CB!!!
  // createMarkersCluster('http://localhost:5000/api/spots');

  // initialize the google map
  const initGoogleMap = (props) => {
    var latitude = 48.856614;
    var longitude = 2.3522219;
    // Case move the map
    if (props.place && Object.keys(props.place).length > 2) {
      latitude = props.place.geometry.location.lat();
      longitude = props.place.geometry.location.lng();
      // case spot clicked
    } else if (props.place && Object.keys(props.place).length === 2) {
      latitude = props.place.lat;
      longitude = props.place.lng;
    }

    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 8,
      styles: stylesArray,
    });
  };
  return <div ref={googleMapRef} style={{ width: "100%", height: 500 }} />;
};

export default GMap;
