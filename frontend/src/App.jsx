import React from "react";
import { Outlet } from "react-router-dom";
import { Cartegory, Footer, Header } from "./components/index.js";

function App() {
  return (
    <>
      <div className="w-full">
        <div className="w-full sticky top-0 z-30">
          <Header />
          <Cartegory />
        </div>
        <div className="w-full bg-[rgb(244,244,246)]">
          <div className="w-[90%] mx-auto">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
