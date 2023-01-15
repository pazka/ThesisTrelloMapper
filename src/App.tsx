import { useEffect } from 'react';
import './App.css';
import MapDipslay from './components/MapDisplay';

function App() {
  useEffect(() => {
    //init api services ans script

  }, []);

  return (
    <div style={{
      height: "100vh"
    }}>
      <MapDipslay />
    </div>
  );
}

export default App;
