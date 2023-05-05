import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import OverallForm from "../features/Checkout/components/OverallForm";
import AddressResidenceForm from "../features/Checkout/components/AddressResidenceForm";
import RegistrationAddressForm from "../features/Checkout/components/RegistrationAddressForm";
import SocialMediaForm from "../features/Checkout/components/SocialMediaForm";
import TypeOwnershipForm from "../features/Checkout/components/TypeOwnershipForm";

export const paths = {
  origin: "/",
  children: {
    "type-ownership": "/type-ownership",
    "registration-address": "/registration-address",
    "address-residence": "/address-residence",
    "social-media": "/social-media",
  },
};

export const router = createBrowserRouter([
  {
    path: paths.origin,
    element: <App />,
    children: [
      {
        path: paths.origin,
        element: <OverallForm />,
      },
      {
        path: paths.children["type-ownership"],
        element: <TypeOwnershipForm />,
      },
      {
        path: paths.children["registration-address"],
        element: <RegistrationAddressForm />,
      },
      {
        path: paths.children["address-residence"],
        element: <AddressResidenceForm />,
      },
      {
        path: paths.children["social-media"],
        element: <SocialMediaForm />,
      },
    ],
  },
]);
