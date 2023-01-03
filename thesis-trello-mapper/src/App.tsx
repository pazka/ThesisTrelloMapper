import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { initMap } from './utils/map';

function App() {
  const ref = useRef(null)
  useEffect(() => {
    if(ref.current)
      initMap(ref)
  }, [ref])

  return (
    <div className="App">
      Hey ho
      <div ref={ref} style={{
        width: "100%",
        height : "80vh"
      }}></div>
    </div>
  );
}

export default App;
