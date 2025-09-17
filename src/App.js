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
    data: "http://localhost:4000",
    keycloak_url: "https://auth.telerapp.net/admin/realms/Telerapp",
    user: {
        id: "ca6e775f-9912-4b20-a42f-e56a8b6ce3ee",
        profile: {
            sub: "ca6e775f-9912-4b20-a42f-e56a8b6ce3ee",
            radiologyGroup: "Euracare, Ghana",
            mobileNumber: "1236547890",
            templates: [
                "IND-MR-01"
            ],
            permission: [
                "Bone fracture",
                "Brain Stroke"
            ],
            preferred_username: "mayur_v",
            given_name: "mayur",
            roleType: "super-admin",
            name: "mayur v",
            title: "mayur_v",
            qualification: "M.B.A",
            uploadSignature: "https://telerappdevattachments.s3.ap-south-1.amazonaws.com/uploads/1731044318569-image.png",
            registrationNo: "2121",
            family_name: "v",
            email: "mayurv@gmail.com"
        },
    },
  };
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
