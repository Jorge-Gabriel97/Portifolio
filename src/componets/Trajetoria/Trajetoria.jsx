import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "../../Utils/Reveal";
import TituloSecao from "../Kit/TituloSecao";
import { EXPERIENCIAS } from "../../dados/perfil";

/*
 * TRAJETÓRIA: experiências como marcos numa trilha à beira-mar, e a maré sobe pela trilha com a rolagem.
 * Cada boia fica apagada até a água chegar nela; aí ela acende, boia e o cartão ganha cor.
 * ✏️ Os textos ficam em src/dados/perfil.js.
 */
const MotionSpan = motion.span;
const MotionDiv = motion.div;

function Trajetoria() {
    const reduzirMovimento = useReducedMotion();
    const trilhaRef = useRef(null);
    const marcosRef = useRef([]);
    const [alcancadas, setAlcancadas] = useState(0);

    // A maré começa quando a trilha passa de 70% da tela e termina quando o fim dela chega ao meio
    const { scrollYProgress: mare } = useScroll({ target: trilhaRef, offset: ["start 0.7", "end 0.5"] });
    const nivel = useTransform(mare, (p) => `${p * 100}%`);

    useMotionValueEvent(mare, "change", (p) => {
        const trilha = trilhaRef.current;
        if (!trilha) return;
        const caixa = trilha.getBoundingClientRect();
        // A boia fica a ~18px do topo do marco: conta quando a água passa do centro dela
        const total = marcosRef.current.filter((m) => m && m.getBoundingClientRect().top - caixa.top + 18 <= p * caixa.height).length;
        setAlcancadas(total);
    });

    const molhada = (indice) => reduzirMovimento || indice < alcancadas;

    return (
        <section id="trajetoria" aria-labelledby="titulo-trajetoria" className="scroll-mt-20 py-20 md:py-28">
            <TituloSecao id="titulo-trajetoria" titulo="Trajetória">
                Antes de programar profissionalmente, aprendi a investigar sistemas em produção: primeiro no suporte técnico, hoje na área de redes.
            </TituloSecao>

            <ol ref={trilhaRef} className="relative mt-12 space-y-10 pl-8 md:ml-4 md:pl-12">
                {/* Trilha seca (pontilhada) e a água que sobe por cima dela */}
                <span className="absolute inset-y-0 left-0 border-l-4 border-dotted border-areia-escura dark:border-white/15" aria-hidden="true" />
                <MotionSpan
                    className="absolute left-0 top-0 w-1 rounded-full bg-gradient-to-b from-oceano to-mar shadow-[0_0_12px_rgba(49,151,149,0.6)] dark:from-mar dark:to-[#4FD1C5]"
                    style={{ height: reduzirMovimento ? "100%" : nivel }}
                    aria-hidden="true"
                />
                {!reduzirMovimento && (
                    <MotionSpan
                        className="absolute left-0.5 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-4 ring-mar/30 dark:bg-[#E6FFFA]"
                        style={{ top: nivel }}
                        aria-hidden="true"
                    />
                )}

                {EXPERIENCIAS.map((exp, indice) => (
                    <Reveal as="li" key={exp.empresa} delay={indice * 0.1} className="relative">
                        <span ref={(el) => (marcosRef.current[indice] = el)} className="absolute top-0" aria-hidden="true" />

                        {/* Boia: apagada na areia, acesa e balançando quando a maré chega */}
                        <MotionSpan
                            className={`absolute -left-[44px] top-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-areia transition-colors duration-500 dark:border-oceano-fundo md:-left-[60px] ${
                                molhada(indice) ? "bg-coral" : "bg-areia-escura dark:bg-white/20"
                            }`}
                            animate={
                                reduzirMovimento
                                    ? undefined
                                    : molhada(indice)
                                      ? { scale: 1, y: [0, -3, 0], transition: { scale: { type: "spring", stiffness: 300, damping: 12 }, y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } } }
                                      : { scale: 0.8, y: 0 }
                            }
                            aria-hidden="true"
                        >
                            {indice === 0 && molhada(indice) && <span className="absolute inset-0 animate-ping rounded-full bg-coral/40 motion-reduce:hidden" />}
                            <span className="h-2 w-2 rounded-full bg-white" />
                        </MotionSpan>

                        <MotionDiv
                            className="cartao p-6 md:p-8"
                            animate={reduzirMovimento ? undefined : { opacity: molhada(indice) ? 1 : 0.55 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#22716F] dark:text-[#4FD1C5]">
                                {exp.periodo}
                            </p>
                            <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                                {exp.cargo} <span className="font-normal text-oceano/70 dark:text-slate-400">· {exp.empresa}</span>
                            </h3>
                            <p className="mt-1 text-sm text-oceano/70 dark:text-slate-400">{exp.local}</p>
                            <ul className="mt-5 space-y-2">
                                {exp.atividades.map((atividade) => (
                                    <li key={atividade} className="flex gap-3 text-oceano/85 dark:text-slate-300">
                                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mar" aria-hidden="true" />
                                        <span>{atividade}</span>
                                    </li>
                                ))}
                            </ul>
                        </MotionDiv>
                    </Reveal>
                ))}
            </ol>
        </section>
    );
}

export default Trajetoria;
