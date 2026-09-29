import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Reveal from "../../Utils/Reveal";

function Hero() {
    return (
        <div
            className="relative flex min-h-[600px] items-center overflow-hidden rounded-[40px] bg-cover bg-center p-8 md:p-16"
            style={{ backgroundImage: "url(/Hero.png)" }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-slate-950/40" />

            <Reveal className="relative w-full md:w-3/5">
                <h1 className="font-serif text-4xl leading-[1.15] text-white sm:text-5xl md:text-6xl">
                    Construo software que funciona em produção — não só no README.
                </h1>
                <p className="mt-6 max-w-xl text-lg text-slate-200">
                    Full Stack focado em interfaces com React/TypeScript e back-ends com Java (Spring Boot) e Node.js, com foco em Clean Code e entregas que resolvem problema real.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                    <Link to="/projects">
                        <Button buttonStyle="primary" arrow>
                            Ver projetos
                        </Button>
                    </Link>
                    <Link to="/about" className="font-medium text-slate-200 underline decoration-slate-500 underline-offset-4 transition-colors hover:text-white">
                        Como eu trabalho
                    </Link>
                </div>
            </Reveal>
        </div>
    )
}

export default Hero;
