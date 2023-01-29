import React, {useEffect} from 'react';
import './App.css';
import MapDisplay from './components/MapDisplay';
import TrelloControls from "./components/TrelloControls";
import {getTrelloCardsWithList} from "./services/trello/trelloService";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";

function App() {
    useEffect(() => {
        //init api services ans script
    }, []);

    return (
        <div style={{
            height: "100vh",
            display: "flex"
        }}>
            <TrelloControls/>
            <MapDisplay/>
        </div>
    );
}

export default App;
