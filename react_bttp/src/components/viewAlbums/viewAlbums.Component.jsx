import React from "react";
import { Link } from "react-router-dom";

function ViewAlbums({ albums }) {
  return (
    <div
      className={
        "bg-tertiary grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 p-4 place-content-start overflow-y-scroll"
      }
    >
      {albums.map((album) => {
        // console.log("album: ", album);
        return (
          <Link
            to={`album/${album.id}`}
            className="col-span-1 border-solid border-2 border-primary text-primary bg-neutralW rounded py-8 px-2 hover:scale-110 hover:shadow-xl transform transition duration-300"
          >
            <div className="text-center font-semibold">{album.name}</div>
            <div className="text-center w-full">
              {album.takenAt.split("T")[0]}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ViewAlbums;
