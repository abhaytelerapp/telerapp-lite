import React from "react";
import Viewer from "./components/viewer/Viewer";
import {
  ModalProvider,
  SnackbarProvider,
} from "./components/viewer/contextProviders";
import Modal from "./components/viewer/Modal";
import Compose from "./components/Mode/Compose";

function App(props) {

  const providers = [[SnackbarProvider], [ModalProvider, { modal: Modal }]];

  const CombinedProviders = ({ children }) =>
    Compose({ components: providers, children });
  return (
    <CombinedProviders>
      <Viewer props={props} />
    </CombinedProviders>
  );
}

export default App;
