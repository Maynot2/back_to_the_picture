import NavBar from "./components/NavBar";
import FilterSearch from "./components/FilterSearch";
import React, { useState, useEffect } from 'react';
import GMap from './components/GoogleMap';

// API key of the google map
const GOOGLE_MAP_API_KEY = '';
 
// load google map script
const loadGoogleMapScript = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
}


function App() {
  const [loadMap, setLoadMap] = useState(false);
  const [addressPlaceSelected, setAddressPlaceSelected] = useState(null);
 
  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);

  return (
    <>
      <NavBar />
      <FilterSearch setAddressPlaceSelected={setAddressPlaceSelected} addressPlaceSelected={addressPlaceSelected}/>
      {!loadMap ? <div>Loading...</div> : <GMap place={addressPlaceSelected}/>}
    </>
  );
}

export default App;