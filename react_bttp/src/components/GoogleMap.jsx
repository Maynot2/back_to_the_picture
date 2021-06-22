import React, { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { user } = useAuth0();

  function createMarkersCluster(apiUrl) {
    const spots = [];
    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        response.forEach((obj, idx) => {
          spots[idx] = obj;
        });
        const takenAt = props.datePicked.taken;
        // Initialize markers
        const markers = spots.map((obj) => {
          let albums = [];
          //Check albums for each spot
          obj.albums.forEach((album) => {
            albums = [];
            if (
              takenAt.toISOString().split("T")[0] ===
              album.takenAt.split("T")[0]
            ) {
              albums.push(album);
            }
          });
          let marker = {
            position: { lat: Number(obj.latitude), lng: Number(obj.longitude) },
            map: googleMap.current,
            albums: obj.albums,
            id: obj.id,
            name: obj.name,
            icon: {
              url: undefined,
            },
          };
          // Case there is albums for the spot at the date picked
          if (albums.length > 0 && !props.isSearchPic) {
            marker["icon"]["url"] =
              "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
          } else if (
            !props.isSearchPic &&
            !(props.spotID.current === marker.id)
          ) {
            marker["icon"]["url"] =
              "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
            // Marker purple for the new marker created in upload mode
          } else if (props.spotID.current === marker.id) {
            marker["icon"]["url"] =
              "http://maps.google.com/mapfiles/ms/icons/purple.png";
          }
          return new window.google.maps.Marker(marker);
        });
        new window.MarkerClusterer(googleMap.current, markers, {
          imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        });
        // add listener click on each marker
        markers.forEach((marker) => {
          marker.addListener("click", function () {
            const tmpObjPositionMarker = {};
            tmpObjPositionMarker["lat"] = this.position.lat();
            tmpObjPositionMarker["lng"] = this.position.lng();
            // Update latitude - Longitude of the map to center on the marker selected to overwrite the search bar entered
            props.setAddressPlaceSelected(tmpObjPositionMarker);
            // SearchMode
            if (props.isSearchPic) {
              props.setAlbums(this.albums);
            } else {
              // Save the id of the selected spot in upload mode
              if (props.isExistingSpot) {
                console.log("Spot selected id", this.id);
                props.spotSelectedObject.current["id"] = this.id;
                props.spotSelectedObject.current["name"] = this.name;
              }
              const takenAt = props.datePicked.taken;
              const albums = [];
              this.albums.forEach((album) => {
                if (
                  takenAt.toISOString().split("T")[0] ===
                  album.takenAt.split("T")[0]
                ) {
                  albums.push(album);
                }
              });
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
          console.log(maxDate);
        }
        // } else {
        //   minDate = new Date(0).toISOString().split("T")[0];
        //   maxDate = new Date().toISOString().split("T")[0];
        // }
        const takenAt = props.datePicked.taken.toISOString().split("T")[0];
        let url;
        // the case in upload mode, fetch all spots without filtering with date
        if (props.isUploadPic) {
          url = `http://${
            process.env.NODE_ENV === "production" ? "" : "localhost:5000/"
          }api/spots?min_latitude=${minLatitude}&max_latitude=${maxLatitude}&min_longitude=${minLongitude}&max_longitude=${maxLongitude}`;
        } else {
          url = `http://${
            process.env.NODE_ENV === "production" ? "" : "localhost:5000/"
          }api/spots?min_latitude=${minLatitude}&max_latitude=${maxLatitude}&min_longitude=${minLongitude}&max_longitude=${maxLongitude}&min_date=${minDate}&max_date=${maxDate}`;
        }

        createMarkersCluster(url);
      }
    );
    // Event on click on map to create marker
    if (!props.isSearchPic && props.isNewSpot) {
      window.google.maps.event.addListener(
        googleMap.current,
        "click",
        function (event) {
          if (!props.isSearchPic && !props.spotCreated.current) {
            var marker = new window.google.maps.Marker({
              position: event.latLng,
              map: googleMap.current,
            });

            marker.addListener("click", function () {
              props.spotCreated.current = null;
              marker.setMap(null);
            });
            props.spotCreated.current = marker;
          } else {
            alert("Error");
          }
        }
      );
    }
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
