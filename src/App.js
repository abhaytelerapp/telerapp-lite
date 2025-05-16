import React from "react";
import Viewer from "./components/viewer/Viewer";
import {
  ModalProvider,
  SnackbarProvider,
} from "./components/viewer/contextProviders";
import Modal from "./components/viewer/Modal";
import Compose from "./components/Mode/Compose";

function App() {
// function App(props) {
    const props = {
    data :"http://localhost:4000",
    keycloak_url: "https://auth.telerapp.net/admin/realms/Telerapp",
    user: {
        id_token:
          "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJrMFJTQ0h1SkFjS0VuSU9JelN1a2tSY3NEQUpzTnNmemV1SHUxeURnc3ZJIn0.eyJleHAiOjE3NDA1MTI1NDgsImlhdCI6MTc0MDQ4Mzc0OCwiYXV0aF90aW1lIjoxNzQwNDgwODg5LCJqdGkiOiIxNDI0MTQzOS1iNGJhLTQ5MjUtODYzMy05ODBmZDU2MDI3YTIiLCJpc3MiOiJodHRwczovL2F1dGgudGVsZXJhcHAubmV0L3JlYWxtcy9UZWxlcmFwcCIsImF1ZCI6InRlbGVyYXBwcy1sb2NhbCIsInN1YiI6ImRiNjk2YjNiLTk4YTYtNGY3MS04MWZiLTkwNGVjNWI2Njk1ZSIsInR5cCI6IklEIiwiYXpwIjoidGVsZXJhcHBzLWxvY2FsIiwic2Vzc2lvbl9zdGF0ZSI6IjdlYTJiYjIxLTdhMmUtNDAwYS05Yjk2LTJhZGYzNDA5MTE4ZiIsImF0X2hhc2giOiJTRzBsRTdDX2dac0tKTVVFNXJXSVpnIiwic2lkIjoiN2VhMmJiMjEtN2EyZS00MDBhLTliOTYtMmFkZjM0MDkxMThmIiwicmFkaW9sb2d5R3JvdXAiOiJFdXJhY2FyZSwgR2hhbmEiLCJncm91cEVtYWlsIjpbIi9FdXJhY2FyZSwgR2hhbmEiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm1vYmlsZU51bWJlciI6WyIxMjM2NTQ3ODkwIl0sInRlbXBsYXRlcyI6WyJJTkQtTVItMDEiXSwicGVybWlzc2lvbiI6WyJCb25lIGZyYWN0dXJlIiwiQnJhaW4gU3Ryb2tlIl0sInByZWZlcnJlZF91c2VybmFtZSI6Im1heXVyX3YiLCJnaXZlbl9uYW1lIjoibWF5dXIiLCJ0aXRsZSI6Im1heXVyX3YiLCJncm91cEFFVGl0bGUiOlsiL0V1cmFjYXJlLCBHaGFuYSJdLCJxdWFsaWZpY2F0aW9uIjoiTS5CLkEiLCJ1cGxvYWRTaWduYXR1cmUiOiJodHRwczovL3RlbGVyYXBwZGV2YXR0YWNobWVudHMuczMuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL3VwbG9hZHMvMTczMTA0NDMxODU2OS1pbWFnZS5wbmciLCJncm91cE1vYmlsZU51bWJlciI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sInJlZ2lzdHJhdGlvbk5vIjoiMjEyMSIsImdyb3VwQWRkcmVzcyI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sIm5hbWUiOiJtYXl1ciB2IiwiZ3JvdXBQb3J0TnVtYmVyIjpbIi9FdXJhY2FyZSwgR2hhbmEiXSwiZ3JvdXBJUCI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sImZhbWlseV9uYW1lIjoidiIsImVtYWlsIjoibWF5dXJ2QGdtYWlsLmNvbSIsImdyb3VwUGVybWlzc2lvbiI6WyIvRXVyYWNhcmUsIEdoYW5hIl19.pwSZszSmSxdkWk9ul3PrWuCUf333PyYiWO2JaQbQc9P_ayT0Z1XsCKv6lvgYoLVBypG3Gxc4zNYuEC53un_6-NBbUDpFmklQ6k9lZ0rbhGw3VZAVLnbPr5S-WWIxEroT2GWKgHuGOQCIy9MWOsGKILJbQWcj-J406D_zjhlOkQzB2v8Y6AR9omMEWDIFFgXoOYnn1EgE862qyfAVtkPzkmtfdkgF5WHvnJu1GumokQNV8ZvEXX6ObWHLa6TWy2wiK1ijXS_UXJFtdB2XwCeJLj4IAjcOL28b6Et0YygfGpDajcz9GJD63ELZaFvOW25LNXkPpk8aRG5AtSQVlE1jKg",
        session_state: "7ea2bb21-7a2e-400a-9b96-2adf3409118f",
        access_token:
          "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJrMFJTQ0h1SkFjS0VuSU9JelN1a2tSY3NEQUpzTnNmemV1SHUxeURnc3ZJIn0.eyJleHAiOjE3NDY2MzU2NDUsImlhdCI6MTc0NjYwNjg0NSwiYXV0aF90aW1lIjoxNzQ2NjAxMjc2LCJqdGkiOiJiNmU0YzY2OC04MzMyLTQ2ZTktYWYwNS00ZTJkMDZhNTFkMGQiLCJpc3MiOiJodHRwczovL2F1dGgudGVsZXJhcHAubmV0L3JlYWxtcy9UZWxlcmFwcCIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYnJva2VyIiwiYWNjb3VudCJdLCJzdWIiOiJkYjY5NmIzYi05OGE2LTRmNzEtODFmYi05MDRlYzViNjY5NWUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ0ZWxlcmFwcHMtbG9jYWwiLCJzZXNzaW9uX3N0YXRlIjoiOGUyMGM3N2UtMzQ5NS00YjkxLWJjMDMtMjhkMmM4ZTAyNWM3IiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vcXVhbnR1bS50ZWxlcmFwcC5jb20iLCJodHRwOi8vbG9jYWxob3N0OjMwMDEiLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJodHRwOi8vdGVzdC1wcm9kdWN0aW9uLWZyb250ZW5kLnMzLXdlYnNpdGUudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20iLCJodHRwczovL3RlbGVyYXBwLm5ldCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy10ZWxlcmFwcCIsIm9mZmxpbmVfYWNjZXNzIiwic3VwZXItYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYnJva2VyIjp7InJvbGVzIjpbInJlYWQtdG9rZW4iXX0sInRlbGVyYXBwcy1sb2NhbCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctYXBwbGljYXRpb25zIiwidmlldy1jb25zZW50Iiwidmlldy1ncm91cHMiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsImRlbGV0ZS1hY2NvdW50IiwibWFuYWdlLWNvbnNlbnQiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiOGUyMGM3N2UtMzQ5NS00YjkxLWJjMDMtMjhkMmM4ZTAyNWM3IiwicmFkaW9sb2d5R3JvdXAiOiJFdXJhY2FyZSwgR2hhbmEiLCJncm91cEVtYWlsIjpbIi9FdXJhY2FyZSwgR2hhbmEiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm1vYmlsZU51bWJlciI6WyIxMjM2NTQ3ODkwIl0sInRlbXBsYXRlcyI6WyJJTkQtTVItMDEiXSwicGVybWlzc2lvbiI6WyJCb25lIGZyYWN0dXJlIiwiQnJhaW4gU3Ryb2tlIl0sInByZWZlcnJlZF91c2VybmFtZSI6Im1heXVyX3YiLCJnaXZlbl9uYW1lIjoibWF5dXIiLCJ0aXRsZSI6Im1heXVyX3YiLCJncm91cEFFVGl0bGUiOlsiL0V1cmFjYXJlLCBHaGFuYSJdLCJxdWFsaWZpY2F0aW9uIjoiTS5CLkEiLCJ1cGxvYWRTaWduYXR1cmUiOiJodHRwczovL3RlbGVyYXBwZGV2YXR0YWNobWVudHMuczMuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL3VwbG9hZHMvMTczMTA0NDMxODU2OS1pbWFnZS5wbmciLCJncm91cE1vYmlsZU51bWJlciI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sInJlZ2lzdHJhdGlvbk5vIjoiMjEyMSIsImdyb3VwQWRkcmVzcyI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sIm5hbWUiOiJtYXl1ciB2IiwiZ3JvdXBQb3J0TnVtYmVyIjpbIi9FdXJhY2FyZSwgR2hhbmEiXSwiZ3JvdXBJUCI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sImZhbWlseV9uYW1lIjoidiIsImVtYWlsIjoibWF5dXJ2QGdtYWlsLmNvbSIsImdyb3VwUGVybWlzc2lvbiI6WyIvRXVyYWNhcmUsIEdoYW5hIl19.cNJHXkbBaO7G8_HU1ifWmKCWOipHsCTpA99E_-zTAVMLo7iVJP2mGuahq_OoJ1n6sTIeR1f1NF8GFBjP-UewVQlhF2iWxTxxmo1Km83_nN5QXl0jXersMqvhpTEVPo9YnskcZuxMNjiaK3nKYIqWrI6yTSzks4B4IZsygGmyIwubFT1smrPVHreUM0H3umWkuARRiu3iNdcl5Eagqkg6sQF4d5sW1f8ClsjQfLl_PTkMiomM6OCn8QoMOFxJSpyf7ZNBWXmBsNDkMFwHu2gAvIIgSwdq16msfseM8jEdhjl5h1x2MwyXlqAAand7A59cy4Ygv29mUY0rLtJx39LcGA",
        refresh_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzYzlkNTViNC05ZGUxLTRhY2QtYWU2Yi1hMjAwMjg4ZmFhODkifQ.eyJleHAiOjE3NDA1MTI1NDQsImlhdCI6MTc0MDQ4Mzc0OCwianRpIjoiODllM2I5ZjQtNGJlNC00NjY1LTkwOWYtODIzYjgxM2E3NDdiIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnRlbGVyYXBwLm5ldC9yZWFsbXMvVGVsZXJhcHAiLCJhdWQiOiJodHRwczovL2F1dGgudGVsZXJhcHAubmV0L3JlYWxtcy9UZWxlcmFwcCIsInN1YiI6ImRiNjk2YjNiLTk4YTYtNGY3MS04MWZiLTkwNGVjNWI2Njk1ZSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJ0ZWxlcmFwcHMtbG9jYWwiLCJzZXNzaW9uX3N0YXRlIjoiN2VhMmJiMjEtN2EyZS00MDBhLTliOTYtMmFkZjM0MDkxMThmIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjdlYTJiYjIxLTdhMmUtNDAwYS05Yjk2LTJhZGYzNDA5MTE4ZiJ9.0dJClQ65nbE8g9G2I2IQvlxtYmBnMRicS5H5EztSeoY",
        token_type: "Bearer",
        cope: "openid profile email",
        profile: {
          auth_time: 1740480889,
          jti: "14241439-b4ba-4925-8633-980fd56027a2",
          sub: "db696b3b-98a6-4f71-81fb-904ec5b6695e",
          typ: "ID",
          azp: "telerapps-local",
          session_state: "7ea2bb21-7a2e-400a-9b96-2adf3409118f",
          sid: "7ea2bb21-7a2e-400a-9b96-2adf3409118f",
          radiologyGroup: "Euracare, Ghana",
          groupEmail: ["/Euracare, Ghana"],
          email_verified: true,
          mobileNumber: ["1236547890"],
          templates: ["IND-MR-01"],
          permission: ["Bone fracture", "Brain Stroke"],
          preferred_username: "mayur_v",
          given_name: "mayur",
          title: "mayur_v",
          groupAETitle: ["/Euracare, Ghana"],
          qualification: "M.B.A",
          uploadSignature:
            "https://telerappdevattachments.s3.ap-south-1.amazonaws.com/uploads/1731044318569-image.png",
          groupMobileNumber: ["/Euracare, Ghana"],
          registrationNo: "2121",
          groupAddress: ["/Euracare, Ghana"],
          name: "mayur v",
          groupPortNumber: ["/Euracare, Ghana"],
          groupIP: ["/Euracare, Ghana"],
          family_name: "v",
          email: "mayurv@gmail.com",
          groupPermission: ["/Euracare, Ghana"],
        },
        expires_at: 1740512549,
      }
  }

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
