import './App.css';
import NewWordInput from './components/NewWordInput'
import Game from './components/Game'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import React from "react";

function App() {

  return (
      <div className="App" style={{ direction: "rtl", margin: "10px"}}>

{/*        <Helmet>
          <style>{'body { background-color: #6dff95; }'}</style>
        </Helmet>*/}
        <Router>
          <Routes>
            <Route path="/game/:gameID" element={<Game />} />
            <Route index="/" element={<NewWordInput />}  />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
