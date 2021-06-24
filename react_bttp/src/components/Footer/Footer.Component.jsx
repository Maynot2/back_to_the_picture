import React from "react";

function Footer({ isUploadPic }) {
  return (
    <footer
      className={`${
        isUploadPic ? "bg-secondary" : "bg-tertiary"
      } text-neutralB mt-8 border-solid border-t-4 border-neutralW p-8`}
    >
      <div className="text-center p-2">&#169; {new Date().getFullYear()}</div>
      <ul className="flex justify-center">
        <li className="p-2 font-semibold">Thibaut Bernard</li>
        <li className="p-2 font-semibold">Huy Nguyen</li>
        <li className="p-2 font-semibold">Paul Manot</li>
      </ul>
    </footer>
  );
}

export default Footer;
