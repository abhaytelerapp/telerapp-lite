import React from "react";
import Viewer from "./components/viewer/Viewer";
import {
  ModalProvider,
  SnackbarProvider,
} from "./components/viewer/contextProviders";
import Modal from "./components/viewer/Modal";
import Compose from "./components/Mode/Compose";
import { BrowserRouter } from "react-router-dom";

function App(props) {
  const providers = [[SnackbarProvider], [ModalProvider, { modal: Modal }]];
console.log(props,'propsappjs')
  const CombinedProviders = ({ children }) =>
    Compose({ components: providers, children });
  return (
    <CombinedProviders>
      {/* <BrowserRouter> */}
        <Viewer props={props} />
      {/* </BrowserRouter> */}
    </CombinedProviders>
  );
}

export default App;
