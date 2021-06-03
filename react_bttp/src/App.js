import NavBar from "./components/NavBar";
import FilterSearch from "./components/FilterSearch";
import React, { useState } from "react";

function App() {
  const [adressPlaceSelected, setAdressPlaceSelected] = useState(null);

  return (
    <>
      <NavBar />
      <FilterSearch setAdressPlaceSelected={setAdressPlaceSelected} adressPlaceSelected={adressPlaceSelected}/>
    </>
  );
}

export default App;
