import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import Images from "./Images";

function Albums({ id }) {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${
            process.env.NODE_ENV === "production"
              ? ""
              : "http://localhost:5000/"
          }api/albums/${id}/pictures`
        );
        console.log(res);
        const pics = await res.json();
        console.log(pics);
        setPictures(pics.map((picture) => picture.url));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="h-auto bg-primary w-full text-white">
      <NavBar />
      <Images pictures={pictures} />
    </div>
  );
}
export default Albums;
