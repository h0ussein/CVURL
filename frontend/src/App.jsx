import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Resume from './components/Resume';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/hussein" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
