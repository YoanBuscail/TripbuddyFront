import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserProfile from './pages/UserProfile';
import LegalMentions from './components/legalMentions/LegalMentions'
import Footer from './components/footer/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/mentions-legales" element={<LegalMentions />} />
          <Route path="/" element={<UserProfile />} />
          {/* Autres routes */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

