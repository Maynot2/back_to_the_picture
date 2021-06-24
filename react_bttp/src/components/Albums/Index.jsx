import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import Images from "./Images";
import Footer from "../Footer/Footer.Component";

function Albums({ id, isSearchPic }) {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const options = {
          method: "GET",
          mode: "no-cors", // or without this line
          headers: {
            "content-type": "application/json",
          },
        };
        const res = await fetch(
          `${
            process.env.NODE_ENV === "production"
              ? "https://backtothepicture.me/"
              : "http://localhost:5000/"
          }api/albums/${id}/pictures`,
          options
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
    <div className="bg-primary w-full text-white flex flex-col min-h-screen">
      <NavBar />
      <Images pictures={pictures} />
      <Footer />
    </div>
  );
}
export default Albums;
