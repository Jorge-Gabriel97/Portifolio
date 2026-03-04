import { useState, useContext } from 'react';
import { Link } from "react-router-dom";
//Assets
import Logo from "../../assets/Logo.png";
import "./Header.css";

// 1. Follow the Data Flow: Importando o contexto para acessar o estado global
import { AppContext } from '../contexts/Appcontext.jsx';

//Components
import Button from '../Button/Button';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    // 2. Sintonizando o rádio na nossa "estação" do tema
    const { isDarkMode, toggleTheme } = useContext(AppContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header>
            <div className="container">
                <div className="al-center d-flex jc-space-between">
                    <Link to="/"><img src={Logo} alt="Logo Jorge" /></Link>
                    <div className="mobile-menu">
                        <Button buttonStyle="secondary" onClick={toggleMenu}>Menu</Button>
                    </div>
                    <nav className={`${isOpen ? 'open' : ''}`}>
                        <Button buttonStyle="unstyled" className="mobile-menu close-btn" onClick={toggleMenu}>
                            x
                        </Button>
                        {/* Como a sua lista já tem a classe d-flex, o botão vai ficar perfeitamente alinhado ao lado do Contato */}
                        <ul className="d-flex" style={{ alignItems: 'center' }}>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/about">Sobre mim</Link></li>
                            <li><Link to="/Projects">Projetos</Link></li>
                            <li><Link to="/contact">Contato</Link></li>

                            {/* 3. O nosso botão de Dark Mode */}                            
                            <li>
                                <label className="theme-switch">
                                    <input
                                        type="checkbox"
                                        checked={isDarkMode}
                                        onChange={toggleTheme}
                                        aria-label="Alternar tema escuro"
                                    />
                                    <span className="slider">
                                        <span className="icon-sun">☀️</span>
                                        <span className="icon-moon">🌙</span>
                                    </span>
                                </label>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;