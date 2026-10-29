import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import AguaInterativa from "./AguaInterativa";
import { faixa } from "../../Utils/rolagem";

/*
 * PÔR DO SOL que acompanha a rolagem (Hero e Banners).
 * Conforme a seção sai da tela, o sol desce e afunda no mar, fica mais avermelhado, o céu escurece
 * e as estrelas aparecem. O mar (AguaInterativa) reflete o sol e ondula onde o mouse passa.
 * Fica atrás do conteúdo da seção (-z-10); a seção precisa de "relative isolate overflow-hidden".
 *
 * Props: alvoRef (ref da seção, que define a rolagem e recebe o mouse) e variante "hero" ou "banner".
 */
const MotionDiv = motion.div;

// Posições fixas (geradas uma vez) para as estrelas não "pularem" a cada renderização
const ESTRELAS = Array.from({ length: 46 }, (_, i) => ({
    x: (i * 37.7) % 100,
    y: (i * 53.3) % 62,
    tamanho: i % 7 === 0 ? 2.5 : i % 3 === 0 ? 1.8 : 1.2,
    atraso: (i % 9) * 0.4,
}));

const VARIANTES = {
    hero: {
        // Altura do mar e posição/tamanho do sol; o centro do sol começa exatamente no horizonte
        mar: "h-[26%]",
        horizonte: "bottom-[26%]",
        sol: "right-[-10%] h-28 w-28 sm:right-[12%] sm:h-40 sm:w-40 md:h-56 md:w-56",
    },
    banner: {
        mar: "h-[36%]",
        horizonte: "bottom-[36%]",
        sol: "right-[8%] h-24 w-24 md:h-32 md:w-32",
    },
};

function PorDoSol({ alvoRef, variante = "hero" }) {
    const reduzirMovimento = useReducedMotion();
    const solRef = useRef(null);
    const v = VARIANTES[variante];
    const { scrollYProgress: p } = useScroll({ target: alvoRef, offset: ["start start", "end start"] });

    // O pôr do sol se completa na primeira metade da rolagem da seção, enquanto ela ainda está na tela.
    // Funções em vez de faixas em array (ver Utils/rolagem.js).
    const descida = useTransform(p, (x) => `${faixa(x, 0, 0.55) * 80}%`);
    const tomDoSol = useTransform(p, (x) => `saturate(${1 + faixa(x, 0, 0.55) * 0.6}) hue-rotate(${-faixa(x, 0, 0.55) * 25}deg)`);
    const brilho = useTransform(p, (x) => 1 - faixa(x, 0, 0.5) * 0.8);
    const noite = useTransform(p, (x) => faixa(x, 0.03, 0.5) * 0.8);
    const estrelas = useTransform(p, (x) => faixa(x, 0.18, 0.5));
    const marEscuro = useTransform(p, (x) => faixa(x, 0, 0.55) * 0.55);

    return (
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            {/* Céu da noite chegando por cima do degradê do fim de tarde */}
            <MotionDiv style={{ opacity: noite }} className="absolute inset-0 bg-gradient-to-b from-[#0B1E35] via-[#132B4A] to-[#3B2F4A]" />

            <MotionDiv style={{ opacity: estrelas }} className="absolute inset-0">
                {ESTRELAS.map((e, i) => (
                    <span
                        key={i}
                        className="absolute animate-pulse rounded-full bg-white motion-reduce:animate-none"
                        style={{ left: `${e.x}%`, top: `${e.y}%`, width: e.tamanho, height: e.tamanho, animationDelay: `${e.atraso}s` }}
                    />
                ))}
            </MotionDiv>

            {/* Sol: o centro começa no horizonte e desce para dentro do mar */}
            <div className={`absolute translate-y-1/2 ${v.horizonte} ${v.sol}`}>
                <MotionDiv ref={solRef} style={{ y: descida, filter: tomDoSol }} className="h-full w-full">
                    <MotionDiv
                        style={{ opacity: brilho }}
                        className="absolute -inset-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,173,85,0.55)_0%,rgba(221,107,32,0.25)_35%,transparent_70%)]"
                    />
                    <div className="relative h-full w-full rounded-full bg-gradient-to-b from-[#F6AD55] to-sol" />
                </MotionDiv>
            </div>

            {/* Mar: fica na frente do sol, então o sol "afunda" nele */}
            <div className={`absolute inset-x-0 bottom-0 overflow-hidden bg-gradient-to-b from-[#4A6A8F] via-[#2C5282] to-[#1A365D] ${v.mar}`}>
                <div className="absolute inset-x-0 top-0 h-px bg-[#FBD38D]/40" />
                <MotionDiv style={{ opacity: marEscuro }} className="absolute inset-0 bg-[#0B1E35]" />
                <AguaInterativa progresso={p} solRef={solRef} alvoRef={alvoRef} animar={!reduzirMovimento} />
            </div>
        </div>
    );
}

export default PorDoSol;
