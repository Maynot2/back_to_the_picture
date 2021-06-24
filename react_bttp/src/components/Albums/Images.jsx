import React, { useState } from "react";
import ImageSlider from "./Slider";
import Mosaique from "./Mosaique";

function Images({ pictures }) {
  const [mosaique, setMosaique] = useState(0);
  const notActive =
    "shadow-2xl w-full m-2 h-full transition duration-300 transform hover:scale-90 motion-reduce:transform-none font-mono bg-tertiary hover:bg-neutralW hover:text-tertiary border-tertiary border-2  text-primary font-semibold py-2 px-4 mt-5 md:mt-0 rounded";
  const active =
    " shadow-2xl w-full m-2 h-full transition duration-300 transform hover:scale-90 motion-reduce:transform-none font-mono bg-neutralW text-tertiary border-tertiary border-2  text-primary font-semibold py-2 px-4 mt-5 md:mt-0 rounded";
  return (
    <>
      <div className="flex mx-5 mt-5 justify-center flex-1">
        <button
          className={mosaique === 1 ? active : notActive}
          onClick={() => {
            setMosaique(1);
          }}
        >
          Mosaique
        </button>
        <button
          className={mosaique === 0 ? active : notActive}
          onClick={() => {
            setMosaique(0);
          }}
        >
          Slider
        </button>
      </div>
      <div className="flex flex-wrap mx-5 mt-10 font-mano justify-center h-auto text-white rounded">
        {mosaique === 1 ? (
          <Mosaique pictures={pictures} />
        ) : (
          <ImageSlider pictures={pictures} />
        )}
      </div>
    </>
  );
}
export default Images;
