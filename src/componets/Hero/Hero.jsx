import { Link } from "react-router-dom";
import Reveal from "../../Utils/Reveal";
import Ondas from "../Praia/Ondas";

/*
 * HERO: fim de tarde na praia.
 * Camadas, de trás para frente: céu em degradê > sol > nuvens > reflexo na água > texto > ondas.
 * O texto fica sobre a parte escura do céu, então o contraste com o branco é alto
 * mesmo com o degradê (verificado para o texto normal, não só para títulos).
 *
 * ✏️ TEXTOS: edite o objeto HERO abaixo. Não prometa o que o GitHub não mostra.
 */
const HERO = {
    local: "Jorge Gabriel · Salvador, BA",
    titulo: "Crio aplicações completas, da API à interface.",
    resumo:
        "Graduado em Análise e Desenvolvimento de Sistemas e pós-graduando em Segurança da Informação. Construo back-ends com Java e Spring Boot e front-ends com React e TypeScript, com a bagagem de quem vem do suporte técnico e da área de redes.",
    ctaPrincipal: { texto: "Ver projetos", destino: "/projects" },
    ctaSecundario: { texto: "Falar comigo", destino: "/contact" },
};

function Nuvem({ className, style }) {
    return (
        <svg viewBox="0 0 120 40" className={`absolute w-28 md:w-40 ${className}`} style={style} aria-hidden="true">
            <path
                d="M20 32 h78 a14 14 0 0 0 0-28 a20 20 0 0 0-36-4 a16 16 0 0 0-30 8 a12 12 0 0 0-12 24z"
                className="fill-white/70"
            />
        </svg>
    );
}

function Hero() {
    return (
        <section
            aria-label="Apresentação"
            className="relative isolate flex min-h-[620px] items-center overflow-hidden rounded-t-[40px] bg-gradient-to-b from-oceano via-[#2C5282] to-[#E9A46A] px-6 pb-28 pt-16 md:px-16"
        >
            {/* Sol se pondo no horizonte */}
            {/* No celular o sol fica menor e mais à direita, para não ficar atrás dos botões */}
            <div className="animate-sol absolute bottom-16 right-[-10%] -z-10 h-28 w-28 rounded-full opacity-90 sm:bottom-24 sm:right-[12%] sm:h-40 sm:w-40 sm:opacity-100 bg-gradient-to-b from-[#F6AD55] to-sol shadow-[0_0_120px_40px_rgba(221,107,32,0.45)] md:h-56 md:w-56" />

            {/* Nuvens minimalistas (delays negativos para já começarem espalhadas) */}
            <Nuvem className="animate-nuvem top-12 -z-10 opacity-80" style={{ animationDelay: "-5s" }} />
            <Nuvem className="animate-nuvem top-32 -z-10 scale-75 opacity-60" style={{ animationDelay: "-22s" }} />

            {/* Reflexo do sol na água */}
            <div className="absolute bottom-16 right-[10%] -z-10 hidden w-64 flex-col items-center gap-2 sm:flex md:bottom-24">
                <span className="animate-reflexo h-1 w-40 rounded-full bg-[#FBD38D]" />
                <span className="animate-reflexo h-1 w-28 rounded-full bg-[#FBD38D]" style={{ animationDelay: "-2s" }} />
                <span className="animate-reflexo h-1 w-16 rounded-full bg-[#FBD38D]" style={{ animationDelay: "-4s" }} />
            </div>

            {/* Véu escuro atrás do texto: garante leitura em qualquer ponto do degradê */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-oceano/85 via-oceano/40 to-transparent" />

            <Reveal className="relative w-full md:w-3/5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#FBD38D]">{HERO.local}</p>
                <h1 className="mt-4 font-serif text-4xl leading-[1.15] text-white sm:text-5xl md:text-6xl">
                    {HERO.titulo}
                </h1>
                <p className="mt-6 max-w-xl text-lg text-slate-100">{HERO.resumo}</p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link
                        to={HERO.ctaPrincipal.destino}
                        className="rounded-full bg-areia px-7 py-3 font-semibold text-oceano shadow-lg transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                        {HERO.ctaPrincipal.texto} ➔
                    </Link>
                    <Link
                        to={HERO.ctaSecundario.destino}
                        className="rounded-full border-2 border-white/80 px-7 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                        {HERO.ctaSecundario.texto}
                    </Link>
                </div>
            </Reveal>

            {/* A onda da frente tem a cor da seção seguinte (areia / fundo escuro) */}
            <Ondas />
        </section>
    );
}

export default Hero;
