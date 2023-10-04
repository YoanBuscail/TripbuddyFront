import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import Blog from './pages/Blog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/blog" element={<Blog />} />
        {/* Ajoutez plus de routes ici si nécessaire */}
      </Routes>
    </Router>
  );
}

export default App;
