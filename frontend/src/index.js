import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import PaymentProcessing from "./paymentProcessing";
import Phonepe from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Phonepe />
  },
  {
    path: "/payment/:txnId",
    element: <PaymentProcessing />
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);