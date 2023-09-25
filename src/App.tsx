import { BrowserRouter, Route, } from 'react-router-dom';
import { useState } from 'react'
import './App.css';
import Profil from './pages/Profil'; 
import Logout from './'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Profil />
    </div>
    <Footer />
    </BrowserRouter>
    
  );
}

export default App;
