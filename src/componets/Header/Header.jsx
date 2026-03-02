import {useState} from 'react';
import { Link } from "react-router-dom";
//Assets
import Logo from "../../assets/Logo.png";
import "./Header.css";

//Components
import Button from '../Button/Button';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu =() => {
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
                        <ul className="d-flex">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/about">Sobre mim</Link></li>
                            <li><Link to="/Projects">Projetos</Link></li>
                            <li><Link to="/contact">Contato</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;