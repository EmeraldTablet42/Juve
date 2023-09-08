import React, { useEffect, useState } from "react";
import sampleimage from "../imagefile/topbutton.png";
import "./top.css";
const Top = () => {
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    const scrollDistance = 300;
    if (window.scrollY >= scrollDistance) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="scroll">
      {showButton && (
        <button
          className="sidemenu-object"
          style={{ boxShadow: "none", cursor: "pointer" }}
          onClick={scrollToTop}
          type="button"
        >
          <img src={sampleimage} alt="top" style={{ width: "65px" }}></img>
        </button>
      )}
    </div>
  );
};

export default Top;
