import { Link } from "react-router-dom";
//Assets
import Logo from "../../assets/Logo.png";
import "./Header.css";

function Header() {
    return (
        <header>
            <div className="container">
                <div className="al-center d-flex jc-space-between">                    
                    <Link to="/"><img src={Logo} alt="Logo Jorge" /></Link>
                    <nav>
                    <ul className="d-flex">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/Projects">Projects</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
                </div>                
            </div>
        </header>
    )
}

export default Header;