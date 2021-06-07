import NavBar from "./components/NavBar";
import FilterSearch from "./components/FilterSearch";
import React, { useState } from 'react';
import GMap from './components/GoogleMap';

function App() {
  const [addressPlaceSelected, setAddressPlaceSelected] = useState(null);

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