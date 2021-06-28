import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer/Footer.Component";
import { ReactComponent as ReactLogoFull } from "../BTTP-logo-full-navy.svg";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-primary w-full text-white flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 container mx-auto bg-neutralW text-neutralB text-center border-solid border-2 border-tertiary rounded mt-8 p-8">
        <h1 className="text-3xl pb-4 uppercase">
          Get your Pics by location and date!
        </h1>
        <p className="pb-4 leading-loose">
          Have you ever surfed great waves and were dying to see what the
          photographers captured from the beach!? Have you ever landed a massive
          trick at the snowpark and were like "where is that guy? I am sure he
          took a killer shot!". Have you ever been to a great festival or
          concert and took picies with your new best friends of the day and were
          like "Jeez I wish I could see those!?".
          <div className=""></div>
        </p>
        <p className="pb-10 leading-loose">well now it's possible with</p>
        <div className="flex flex-col items-center">
          <Link to="/" className="pb-10">
            <ReactLogoFull className="w-52 lg:w-72" />
          </Link>
          <Link
            to="/"
            className="bg-secondary border-2 border-primary text-neutralW py-4 px-6 rounded-full "
          >
            Find your pics here!!!
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
