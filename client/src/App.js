import './App.css';
import React from 'react';
import{ Route, Routes, useLocation} from "react-router-dom";
import LandingPage from './views/landingPage/landingPage.jsx';
import HomePage from './views/homePage/homePage.jsx';
import DetailPage from './views/detailPage/detailPage.jsx';
import FormPage from './views/formPage/formPage';
import NavBar from './components/navbar/navbar';

function App() {
  
  const location = useLocation();

  return (
    <div className="App">      
      {location.pathname !== "/" && <NavBar />} 
    <Routes>     
      <Route exact path= "/" element={<LandingPage />} />
      <Route path= "/home" element={<HomePage />} />
      <Route path= "/detail/:id" element={<DetailPage />} />
      <Route path= "/form" element={<FormPage />} />
    </Routes> 
    </div>
  );
}

export default App;