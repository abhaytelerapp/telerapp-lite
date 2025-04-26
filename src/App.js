import React from "react";
import Viewer from "./components/viewer/Viewer";

function App(props) {
  console.log(props, props?.message, 'props?.message' )
  return <Viewer props={props}/>;
}

export default App;
