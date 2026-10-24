import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

// Komponen App sebagai root aplikasi yang mengatur Routing SPA dan Context Provider
function App() {
  return (
    <Router>
      <BookProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BookProvider>
    </Router>
  );
}

export default App;
