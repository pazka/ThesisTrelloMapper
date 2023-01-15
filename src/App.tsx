import {useEffect} from 'react';
import './App.css';
import MapDisplay from './components/MapDisplay';
import TrelloControls from "./components/TrelloControls";

function App() {
    useEffect(() => {
        //init api services ans script

    }, []);

    return (
        <div style={{
            height: "100vh"
        }}>
            <MapDisplay/>
            <TrelloControls/>
        </div>
    );
}

export default App;
