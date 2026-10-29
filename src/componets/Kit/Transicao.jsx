import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Ondas from "../Praia/Ondas";
import { rolarAte } from "../../Utils/rolagem";
import { TITULO_DA_ROTA } from "../../dados/navegacao";

/*
 * TRANSIÇÃO DE PÁGINA: a maré.
 * Ao sair de uma página, o mar sobe e cobre a tela (ondas na frente); a página nova nasce coberta,
 * mostra o nome dela e o mar recua para cima, revelando o conteúdo (ondas atrás).
 * Usada em App.jsx com AnimatePresence mode="wait". Com "reduzir movimento" vira um fade simples.
 * titulo: nome da página quando a rota não está na navegação (ex.: a 404).
 */
const MotionDiv = motion.div;
const MotionP = motion.p;

const EASE = [0.76, 0, 0.24, 1];
// Tempo até o mar terminar de recuar (atraso + duração da animação de entrada)
const FIM_DA_ENTRADA = 1150;
const TITULO_PADRAO = "Jorge Gabriel · Desenvolvedor Full Stack";

// Na primeira carga o foco fica onde o navegador colocou; só nas trocas de página ele é movido
let primeiraCarga = true;

function Mar({ titulo }) {
    return (
        <MotionDiv
            className="pointer-events-none fixed inset-x-0 -top-16 z-[60] flex h-[calc(100vh+8rem)] flex-col md:-top-24 md:h-[calc(100vh+12rem)]"
            initial={{ y: "0%" }}
            animate={{ y: "-100%", transition: { duration: 0.8, delay: 0.35, ease: EASE } }}
            exit={{ y: ["100%", "0%"], transition: { duration: 0.65, ease: EASE } }}
            aria-hidden="true"
        >
            {/* Ondas da frente, que lideram a subida */}
            <div className="relative h-16 shrink-0 md:h-24">
                <Ondas corDaFrente="fill-[#17405F]" />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#17405F] to-[#0B1E35] text-areia">
                <MotionP
                    className="font-mono text-xs uppercase tracking-[0.3em] text-areia/60"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: [0, 1, 0], y: [12, 0, -12], transition: { duration: 0.9, times: [0, 0.35, 1] } }}
                    exit={{ opacity: 0 }}
                >
                    Jorge Gabriel
                </MotionP>
                <MotionP
                    className="mt-3 font-serif text-4xl md:text-6xl"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: [0, 1, 0], y: [16, 0, -16], transition: { duration: 0.95, times: [0, 0.35, 1] } }}
                    exit={{ opacity: 0 }}
                >
                    {titulo}
                </MotionP>
            </div>
            {/* Ondas de trás (viradas), que ficam na borda quando o mar recua para cima */}
            <div className="relative h-16 shrink-0 -scale-y-100 md:h-24">
                <Ondas corDaFrente="fill-[#0B1E35]" />
            </div>
        </MotionDiv>
    );
}

function Transicao({ children, titulo }) {
    const reduzirMovimento = useReducedMotion();
    const { pathname } = useLocation();

    // A página nova começa do topo, enquanto ainda está coberta pelo mar
    useEffect(() => {
        rolarAte(0, { imediato: true });
    }, []);

    // Título da aba de cada página (também é o que aparece no Google e nos favoritos)
    useEffect(() => {
        const nome = titulo ?? TITULO_DA_ROTA[pathname];
        document.title = pathname === "/" || !nome ? TITULO_PADRAO : `${nome} · Jorge Gabriel`;
    }, [pathname, titulo]);

    // Depois da troca, o foco vai para o título da página nova: quem navega por teclado
    // ou leitor de tela não fica "perdido" no link da página anterior
    useEffect(() => {
        if (primeiraCarga) {
            primeiraCarga = false;
            return undefined;
        }
        const espera = setTimeout(() => {
            const titulo = document.querySelector("main h1, h1");
            if (!titulo) return;
            titulo.setAttribute("tabindex", "-1");
            titulo.focus({ preventScroll: true });
        }, reduzirMovimento ? 0 : FIM_DA_ENTRADA);
        return () => clearTimeout(espera);
    }, [reduzirMovimento]);

    if (reduzirMovimento) {
        return (
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {children}
            </MotionDiv>
        );
    }

    return (
        <>
            {children}
            <Mar titulo={titulo ?? TITULO_DA_ROTA[pathname] ?? ""} />
        </>
    );
}

export default Transicao;
