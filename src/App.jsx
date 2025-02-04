import React, { useState } from "react";
import UpcomingClasses from "./components/UpcomingClasses";
import "./App.css";
import Pract from "./practice/pract";
import TimerApp from "./practice/timer";

const App = () => {
  return (
    // <div className="app-container">
    //   <UpcomingClasses />
     
    // </div>
    <>
     {/* <Pract/> */}
     <TimerApp/>
    </>
  );
};

export default App;
