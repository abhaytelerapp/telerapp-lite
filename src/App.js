import React from "react";
import Viewer from "./components/viewer/Viewer";

function App() {
// function App(props) {

  const props = {
    data :"http://localhost:4000"
  }
  return <Viewer props={props}/>;
}

export default App;
