import NavBar from "./components/NavBar";
import FilterSearch from "./components/FilterSearch";
<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect, useRef } from 'react';
>>>>>>> 25764db3e9d9f692df09a320642608dad1a567ca
import GMap from './components/GoogleMap';

function App() {
<<<<<<< HEAD
  const [addressPlaceSelected, setAddressPlaceSelected] = useState(null);
=======
  const [loadMap, setLoadMap] = useState(false);
  // Adress selected by the user send/update by FilterSearch Component (ButtonSearch OnClick())
  const [addressPlaceSelected, setAddressPlaceSelected] = useState(null);
  

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);
>>>>>>> 25764db3e9d9f692df09a320642608dad1a567ca

  return (
    <>
      <div className="bg-primary">
        <NavBar />
        <main className="px-4">
          <div className="container bg-neutralW mx-auto p-4 md:p-8 border-2 border-secondary rounded font-mono">
            <FilterSearch setAddressPlaceSelected={setAddressPlaceSelected} addressPlaceSelected={addressPlaceSelected}/>
            <div className="lg:grid grid-cols-3 gap-8">
              <div className="map col-span-2 bg-secondary">
                <GMap place={addressPlaceSelected}/>
              </div>
              <div className="bg-tertiary">albums</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;