import NavBar from "./components/NavBar";
import FilterSearch from "./components/FilterSearch";
import React, { useState, useRef } from "react";

function App() {
  // Adress selected by the user send/update by FilterSearch Component (ButtonSearch OnClick())
  const [addressPlaceSelected, setAddressPlaceSelected] = useState(null);
  // Two date selected by the user send/update by FilterSearch Component (ButtonSearch OnClick())
  const datePicked = useRef([]);

  return (
    <>
      <NavBar />
      <FilterSearch datePicked={datePicked} setAddressPlaceSelected={setAddressPlaceSelected} addressPlaceSelected={addressPlaceSelected}/>
    </>
  );
}
export default App;
