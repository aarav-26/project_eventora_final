import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import UserExplore from './Pages/UserDashboard';


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/user-dashboard/*" element={<UserExplore/>}/>
      </Routes>
    </Router>  
    </div>
  );
}

export default App;
