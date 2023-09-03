import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import AboutUs from './About';
import Questions from './Questions';
import Contact from './Contact'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default Router;