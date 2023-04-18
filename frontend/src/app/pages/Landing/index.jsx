import TopNavBar from "app/components/TopBar";
import Post from "app/components/Post";

import React from "react";
import NavBar from "app/components/NavBar";

const Landing = () => {
  return (
    <>
      <div
        style={{
          margin: "0",
          marginBottom: "70px",
          padding: "0",
          width: "100vw",
          overflowX: "hidden",
        }}
      >
        <TopNavBar />
        <Post />
        <NavBar />
      </div>
    </>
  );
};

export default Landing;
