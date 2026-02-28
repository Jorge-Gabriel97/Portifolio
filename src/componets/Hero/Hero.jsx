import { Link } from "react-router-dom";
import "./Hero.css";
import Button from "../Button/Button";

function Hero() {
    return (
        <div className="hero d-flex al-center">
            <div className="hero-text">
                <h1>Desenvolvedor Full Stack</h1>
                <p>Desenvolvedor Full Stack com experiência em React, Node.js e MongoDB. Apaixonado por criar soluções inovadoras e eficientes para desafios complexos. Com um histórico comprovado de entrega de projetos de alta qualidade, estou sempre em busca de novas oportunidades para crescer e contribuir para o sucesso da equipe.</p>
                <Link>
                    <Button buttonStyle="secondary" arrow>
                        Saiba mais
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Hero;