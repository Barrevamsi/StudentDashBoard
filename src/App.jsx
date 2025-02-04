import React, { useState } from "react";
import UpcomingClasses from "./components/UpcomingClasses";
import "./App.css";
import Pract from "./practice/pract";
import TimerApp from "./practice/timer";
import AllClasses from "./Classes/AllClasses";

const App = () => {
  return (
    // <div className="app-container">
    //   <UpcomingClasses />
     
    // </div>
    <>
     {/* <Pract/> */}
     {/* <TimerApp/>? */}
     <AllClasses/>
    </>
  );
};

export default App;
