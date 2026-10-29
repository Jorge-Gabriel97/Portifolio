import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Header from "../componets/Header/Header";
import Footer from "../componets/Footer/Footer";
import Rotulo from "../componets/Kit/Rotulo";

/*
 * 404: o número escrito na areia e a onda que vem e apaga, em loop.
 * Ciclo: escrito → a onda sobe a areia e o número some → a onda recua deixando a areia molhada →
 * o número é escrito de novo, da esquerda para a direita.
 * Com "reduzir movimento" fica só o número parado na areia.
 */
const MotionDiv = motion.div;
const MotionP = motion.p;

const CICLO = { duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.48, 0.52, 0.72, 0.78, 0.95, 1] };
const ONDA = ["-100%", "-100%", "-18%", "-22%", "-100%", "-100%", "-100%", "-100%"];
const MOLHADO = [0, 0, 0, 1, 0.9, 0.6, 0, 0];
const NUMERO = {
    opacity: [1, 1, 0.6, 0, 0, 0, 1, 1],
    filter: ["blur(0px)", "blur(0px)", "blur(3px)", "blur(8px)", "blur(8px)", "blur(0px)", "blur(0px)", "blur(0px)"],
    clipPath: ["inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"],
};

// Borda de baixo da onda, com espuma
const BORDA = "M0 0 H1440 V30 C 1320 60, 1200 20, 1080 42 S 840 70, 720 40 S 480 12, 360 44 S 120 66, 0 36 Z";

function Praia404() {
    const reduzirMovimento = useReducedMotion();

    return (
        <div className="relative isolate h-80 overflow-hidden rounded-[40px] md:h-[26rem]" aria-hidden="true">
            {/* Céu e sol (lua no modo escuro) */}
            <div className="absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-[#9CCFDD] to-[#F4D9B8] dark:from-[#0B1E35] dark:to-[#2A3355]">
                <div className="absolute right-[14%] top-[22%] h-14 w-14 rounded-full bg-gradient-to-b from-[#F6AD55] to-sol shadow-[0_0_40px_rgba(246,173,85,0.7)] dark:from-areia dark:to-[#E7D8C6] dark:shadow-[0_0_30px_rgba(244,235,225,0.35)] md:h-20 md:w-20" />
            </div>
            {/* Mar */}
            <div className="absolute inset-x-0 top-[34%] h-[14%] bg-gradient-to-b from-mar to-[#2C7A7B] dark:from-[#1E3A5F] dark:to-[#17405F]" />

            {/* Areia: a onda e o número ficam aqui dentro */}
            <div className="absolute inset-x-0 bottom-0 top-[48%] overflow-hidden bg-[#EAD9C2] dark:bg-[#2B3550]">
                {!reduzirMovimento && (
                    <MotionDiv className="absolute inset-0 bg-[#D9C3A5] dark:bg-[#232C45]" animate={{ opacity: MOLHADO }} transition={CICLO} />
                )}

                <div className="absolute inset-0 flex items-center justify-center">
                    <MotionP
                        className="font-serif text-[7rem] leading-none tracking-[0.12em] text-[#CDB391] [text-shadow:0_2px_0_rgba(255,255,255,0.55),0_-1px_0_rgba(90,60,30,0.25)] dark:text-[#3E4A6B] dark:[text-shadow:0_2px_0_rgba(255,255,255,0.08),0_-1px_0_rgba(0,0,0,0.4)] md:text-[10rem]"
                        animate={reduzirMovimento ? undefined : NUMERO}
                        transition={CICLO}
                    >
                        404
                    </MotionP>
                </div>

                {!reduzirMovimento && (
                    <MotionDiv className="absolute inset-x-0 top-0 h-full" initial={{ y: "-100%" }} animate={{ y: ONDA }} transition={CICLO}>
                        <div className="h-full bg-gradient-to-b from-[#2C7A7B]/90 via-mar/70 to-[#9ED8D2]/80 dark:from-[#17405F]/95 dark:via-[#1E4E6A]/85 dark:to-[#4F8FA0]/70" />
                        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="-mt-px block h-8 w-full md:h-10">
                            <path d={BORDA} className="fill-[#9ED8D2]/80 dark:fill-[#4F8FA0]/70" />
                            <path d={BORDA} transform="translate(0 6)" className="fill-white/60 dark:fill-white/20" />
                        </svg>
                    </MotionDiv>
                )}
            </div>
        </div>
    );
}

function NotFound() {
    return (
        <>
            <Header />
            <main className="container flex-1 py-10 md:py-16">
                <Praia404 />
                <div className="mx-auto mt-12 max-w-xl text-center">
                    <Rotulo>Erro 404</Rotulo>
                    <h1 className="mt-3 font-serif text-4xl md:text-5xl">Essa página a maré levou.</h1>
                    <p className="mt-4 text-lg text-oceano/80 dark:text-slate-300">
                        O endereço que você abriu não existe ou mudou de lugar. Mas a praia continua aqui.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/"
                            className="rounded-full bg-coral px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-[#9C4221] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mar"
                        >
                            Voltar à praia
                        </Link>
                        <Link
                            to="/projects"
                            className="rounded-full border-2 border-oceano px-8 py-4 font-semibold text-oceano transition-colors duration-300 hover:bg-oceano hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mar dark:border-areia dark:text-areia dark:hover:bg-areia dark:hover:text-oceano"
                        >
                            Ver projetos
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default NotFound;
