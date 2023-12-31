import "mapbox-gl/dist/mapbox-gl.css";
import './App.css'
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import  Home from './pages/Home';
import Itineraries from './pages/Itineraries';
import TravelPreparation from './pages/TravelPreparation';
import UserProfile from './pages/UserProfile';
import PageNotFound from "./components/pageNotFound/PageNotFound";
import LegalMentions from "./pages/LegalMentions";

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/itineraires' element={<Itineraries />} />
        <Route path='/prepare-ton-voyage' element={<TravelPreparation />} />
        <Route path='/Profil' element={<UserProfile />} />
        <Route path='/mentions-legales' element={<LegalMentions />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}


export default App
