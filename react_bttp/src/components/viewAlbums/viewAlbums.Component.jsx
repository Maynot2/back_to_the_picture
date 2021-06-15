import React from "react";
import { Link } from "react-router-dom";

function ViewAlbums({ albums }) {
  return (
    <div className={"bg-tertiary flex flex-wrap p-4 content-between"}>
      {albums.map((album) => {
        console.log("album: ", album);
        return (
          <Link
            to={`album/${album.id}`}
            className="w-5/12 border border-neutralB rounded py-8"
          >
            <div className="text-center w-full">{album.name}</div>
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
