import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from './pages/Contact.jsx'; 

// Utils
import ScrollToTop from './Utils/ScrollTop.jsx';


function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />       
        <Route path="/projects" element={<Projects />} /> 
        <Route path="/contact" element={<Contact />} />  
      </Routes>
    </Router>
  );
}

export default App;