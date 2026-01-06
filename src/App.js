import React from "react";
import Viewer from "./components/viewer/Viewer";
import {
  ModalProvider,
  SnackbarProvider,
} from "./components/viewer/contextProviders";
import Modal from "./components/viewer/Modal";
import Compose from "./components/Mode/Compose";
import { BrowserRouter } from "react-router-dom";

function App() {
// function App(props) {
    const props = {
        data :"http://localhost:4000",
        user: {
        id: "77ba038b-4bc2-4d1c-87a5-a989f04c097e",
        profile: {
            sub: "77ba038b-4bc2-4d1c-87a5-a989f04c097e",
            radiologyGroup: [
                "Default"
            ],
            mobileNumber: "+911234567893",
            templates: [
                "IND-MR-01"
            ],
            permission: [
                "Approve Report",
                "AI Editor",
                "Chat Access",
                "All reports",
                "Quantum Edge",
                "VR 1",
                "VR 2"
            ],
            preferred_username: "mayur_r01",
            given_name: "mayur",
            roleType: "Radiologist",
            name: "mayur r",
            title: "Dr",
            qualification: "abhay ",
            uploadSignature: "https://telerappdevattachments.s3.ap-south-1.amazonaws.com/uploads/1759210030396-1738785688620-Dr_Harsh.jpg",
            registrationNo: "1011",
            family_name: "r",
            email: "mayurr01@gmail.com"
        }
      }
    }
  const providers = [[SnackbarProvider], [ModalProvider, { modal: Modal }]];

  const CombinedProviders = ({ children }) =>
    Compose({ components: providers, children });
  return (
    <CombinedProviders>
      <BrowserRouter>
        <Viewer props={props} />
      </BrowserRouter>
    </CombinedProviders>
  );
}

export default App;
