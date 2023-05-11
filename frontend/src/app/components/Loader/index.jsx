import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: "-1",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100%",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
