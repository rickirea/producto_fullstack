import React, { useRef } from "react";
import Map from "./Map";
import Button from "./Button.jsx";
import "./App.css";

function App() {
  const requestPointsRef = useRef(() => {});
  console.log("App is working again...");

  return (
    <div id="app">
      <Map
        zoom={5}
        lat={19.453603}
        lng={-99.14041}
        requestPoint={requestPointsRef}
      />
      <Button onClick={requestPointsRef} />
    </div>
  );
}

export default App;
