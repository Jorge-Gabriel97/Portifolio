import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "lenis/dist/lenis.css";

// Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

import Transicao from "./componets/Kit/Transicao.jsx";
import { iniciarRolagemSuave } from "./Utils/rolagem.js";

// Cada página entra e sai pela transição da maré; mode="wait" espera o mar cobrir antes de trocar
function Rotas() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Transicao><Home /></Transicao>} />
                <Route path="/about" element={<Transicao><About /></Transicao>} />
                <Route path="/projects" element={<Transicao><Projects /></Transicao>} />
                <Route path="/contact" element={<Transicao><Contact /></Transicao>} />
                <Route path="*" element={<Transicao titulo="Página não encontrada"><NotFound /></Transicao>} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    useEffect(() => iniciarRolagemSuave(), []);

    return (
        <Router>
            <Rotas />
        </Router>
    );
}

export default App;
