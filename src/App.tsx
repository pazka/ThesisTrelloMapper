import { useEffect } from 'react';
import './App.css';
import MapDisplay from './components/MapDisplay';

function App() {
  useEffect(() => {
    //init api services ans script

  }, []);

  return (
    <div style={{
      height: "100vh"
    }}>
      <MapDisplay />
    </div>
  );
}

export default App;
