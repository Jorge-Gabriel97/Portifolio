import { Link } from "react-router-dom";
//Assets
import "./Footer.css";
import LinkedinIcon from "../../assets/Linkedin.svg";
import Logo from "../../assets/Logo.png";

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="d-flex jc-space-between footer-content">                    
                    <div className="footer-logo-col">
                        <img src={Logo} alt="Logo Jorge Gabriel" className="footer-logo" />
                        <p className="grey-1-color">Transformando problemas complexos em soluções digitais elegantes.</p>
                        <div className="social-media">
                            <a href="https://www.linkedin.com/in/jorge-gabriel-579605228/" target="_blank" rel="noopener noreferrer">
                                <img src={LinkedinIcon} alt="Linkedin Icon" />
                            </a>
                        </div>
                    </div>                    
                    <div className="footer-pages-col">
                        <h3>Pages</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>                   
                    <div className="footer-contact-col">
                        <h3>Contact</h3>
                        <p className="grey-1-color">jg3043505@gmail.com</p>                        
                    </div>
                </div>                
                <div className="footer-bottom">
                    <p className="grey-1-color">© 2026 Jorge Gabriel. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;