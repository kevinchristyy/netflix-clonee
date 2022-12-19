import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loginscreen from "./screens/Loginscreen";
import Signupscreen from "./screens/Signupscreen";
import Homescreen from "./screens/Homescreen";
import Profilescreen from "./screens/Profilescreen";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Homescreen />,
  },
  {
    path: "/login",
    element: <Loginscreen />,
  },
  {
    path: "/signup",
    element: <Signupscreen />,
  },
  {
    path: "/profile",
    element: <Profilescreen />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
