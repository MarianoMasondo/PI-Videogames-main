import './App.css';
import React from 'react';// ver
import{ Route, Routes} from "react-router-dom";
import LandingPage from './views/landingPage/landingPage.jsx';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path= "/" element={<LandingPage />} />
    </Routes>   
    <h1>holanda</h1>
    </div>
  );
}

export default App;