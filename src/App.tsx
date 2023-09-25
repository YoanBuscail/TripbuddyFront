import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import './App.css';
import Profil from './pages/Profil'; 
import Logout from './'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
    <Router>
    <div className="App">
      <Profil />
    </div>
    </Router>
    <Footer />
    </>
  );
}

export default App;
