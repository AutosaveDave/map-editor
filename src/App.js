
import React from "react";

import './App.css';
import AllContextProviders from "./context/AllContextProviders";
import AppArea from "./components/UserUI/AppArea";

export default function App() {
  return (
    <>
      <AllContextProviders>
        <AppArea/>
      </AllContextProviders>
    </>
  );
}
