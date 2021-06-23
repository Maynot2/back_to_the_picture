import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import  { Redirect } from 'react-router-dom'

function ModeChoice({
  updateSetSearchPic,
  isSearchPic,
  updateSetIsUploadPic,
  isUploadPic,
  setAlbums,
  spotSelectedObject
}) {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="w-full mb-8">
      <div className="grid grid-cols-2 gap-4 h-20 text-neutralW">
        <button
          className={`col-span-1 border-2 rounded font-semibold transition duration-300 ${
            isSearchPic
              ? "bg-tertiary border-tertiary text-neutralW shadow-2xl"
              : "transform scale-90 border-primary text-primary bg-neutral hover:scale-100 hover:shadow-2xl"
          }`}
          onClick={() => {
            updateSetSearchPic();
            setAlbums([]);
          }}
        >
          Search Pictures
        </button>
        <button
          className={`border-2 rounded font-semibold transition duration-300 ${
            isUploadPic
              ? "bg-secondary border-secondary text-neutralW shadow-2xl"
              : "transform scale-90 border-primary text-primary bg-neutralW hover:scale-100 hover:shadow-2xl"
          }`}
          onClick={() => {
            // if (!isAuthenticated) {
            //   alert("Please connect");
            // } else {
              updateSetIsUploadPic();
              setAlbums([]);
              spotSelectedObject.current = {};
            // }
          }}
        >
          Upload Pictures
        </button>
      </div>
    </div>
  );
}

export default ModeChoice;
