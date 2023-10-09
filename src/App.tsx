import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import Blog from './pages/Blog';
import LegalMentions from './pages/LegalMentions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/LegalMentions" element={<LegalMentions />} />
        {/* Ajoutez plus de routes ici si nécessaire */}
      </Routes>
    </Router>
  );
}

export default App;

import './App.css'
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import  Home from './pages/Home';
import Itineraries from './pages/Itineraries';
import TravelPreparation from './pages/TravelPreparation';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/itineraires' element={<Itineraries />} />
        <Route path='/prepare-ton-voyage' element={<TravelPreparation />} />
        <Route path='/Profil' element={<TravelPreparation />} />
        
      </Routes>
    </BrowserRouter>
    </>
  )
}


export default App
