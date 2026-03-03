import { Link } from "react-router-dom";
import "./Hero.css";
import Button from "../Button/Button";

function Hero() {
    return (
        <div className="hero d-flex al-center">
            <div className="hero-text">
                <h1>Desenvolvedor Full Stack</h1>
                <p>Desenvolvedor Full Stack | Graduando em ADS

                    Como estudante de Análise e Desenvolvimento de Sistemas, foco minha trajetória na construção de softwares eficientes, aplicando conceitos de engenharia e Clean Code em cada linha de código.

                    Ecossistema Front-End: Construo interfaces dinâmicas e de alta performance utilizando React e TypeScript, garantindo tipagem segura e componentes reutilizáveis.

                    Arquitetura Back-End: Desenvolvo APIs robustas e escaláveis com Java (Spring Boot) e Node.js, além de criar automações inteligentes e análise de dados com Python.

                    Persistência e Infraestrutura: Experiência prática na modelagem de bancos de dados SQL (PostgreSQL, MySQL) e NoSQL (MongoDB), utilizando Docker e Git para garantir ambientes de desenvolvimento modernos e controle de versão rigoroso.

                    Minha bagagem técnica me permite transitar por todo o ciclo de vida do software, desde o diagnóstico preciso de erros em integrações de APIs até o deploy de soluções completas e seguras.</p>
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