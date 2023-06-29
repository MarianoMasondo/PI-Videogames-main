import './App.css';
import{ Route} from "react-router-dom";
import landingPage from './views/landingPage/landingPage.jsx';

function App() {
  return (
    <div className="App">
    
      <Route exact path= "/" element={<landingPage />} />
   
    </div>
  );
}

export default App;
