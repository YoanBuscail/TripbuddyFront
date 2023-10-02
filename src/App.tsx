// Avec react-router-dom v6
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import Blog from './pages/Blog';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;