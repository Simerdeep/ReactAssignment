//@flow

import type {Element} from "React";
import React from "react";
import "./css/App.css";
import TopView from "./components/TopView";
import { FOOTER_LABEL, SPACEXLAUNCH_PROGRAM_LABEL } from "./AppLabels";

/**
 * Component to hold main view of the app
 *
 * @returns {Element<"div">}
 */
function App(): Element<"div"> {

  return (
    <div className="App">

      <h1>{SPACEXLAUNCH_PROGRAM_LABEL}</h1>
      
      <TopView />
      
      <div className="footer">
        {FOOTER_LABEL}
      </div>
      
    </div>
  );
}

export default App;
