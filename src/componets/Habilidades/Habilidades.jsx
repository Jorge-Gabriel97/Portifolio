import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "../../Utils/Reveal";
import { ESTUDANDO, GITHUB, GRUPOS } from "./dadosHabilidades";

/*
 * HABILIDADES: cada tecnologia é uma prancha de surf.
 * Clicar (ou tocar, no celular) numa prancha abre o painel com o detalhe e os projetos
 * em que ela foi usada. Hover só inclina a prancha, porque celular não tem hover.
 *
 * ✏️ Para editar tecnologias e projetos, altere dadosHabilidades.js (não este arquivo).
 *
 * Contraste: todas as cores de prancha abaixo têm texto branco com contraste >= 4.5:1.
 */
const MotionDiv = motion.div;

const COR_DO_GRUPO = {
    front: "bg-[#2C5282]", // azul-mar
    back: "bg-oceano", // azul profundo
    dados: "bg-[#22716F]", // verde-água escuro
    qualidade: "bg-coral", // coral
};

function Prancha({ habilidade, cor, ativa, onSelecionar, idPainel }) {
    return (
        <button
            type="button"
            onClick={onSelecionar}
            aria-pressed={ativa}
            aria-controls={idPainel}
            className={`group relative flex h-40 w-16 shrink-0 items-center justify-center rounded-[50%_50%_46%_46%/62%_62%_38%_38%] ${cor} text-white shadow-md transition duration-300 hover:-translate-y-2 hover:rotate-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mar md:h-48 md:w-20 ${
                ativa ? "-translate-y-2 ring-4 ring-sol ring-offset-2 ring-offset-areia dark:ring-offset-oceano-fundo" : ""
            }`}
        >
            {/* Faixa central da prancha (stringer) */}
            <span className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-white/35" aria-hidden="true" />
            <span className="relative rotate-180 text-sm font-semibold tracking-wide [writing-mode:vertical-rl] md:text-base">
                {habilidade.nome}
            </span>
        </button>
    );
}

function Painel({ habilidade, id, reduzirMovimento }) {
    return (
        <MotionDiv
            id={id}
            role="region"
            aria-live="polite"
            aria-label={`Detalhes de ${habilidade.nome}`}
            initial={reduzirMovimento ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduzirMovimento ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
        >
            <div className="mt-6 rounded-3xl border border-areia-escura bg-white/70 p-6 dark:border-white/10 dark:bg-oceano/60">
                <h4 className="text-xl font-semibold">{habilidade.nome}</h4>
                <p className="mt-2 text-oceano/80 dark:text-slate-300">{habilidade.detalhe}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#22716F] dark:text-[#4FD1C5]">
                    Onde usei
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                    {habilidade.projetos.map((repo) => (
                        <li key={repo}>
                            <a
                                href={`${GITHUB}/${repo}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block rounded-full border border-oceano/20 px-3 py-1 text-sm font-medium transition hover:border-mar hover:text-[#22716F] dark:border-white/20 dark:hover:text-[#4FD1C5]"
                            >
                                {repo} ↗
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </MotionDiv>
    );
}

function Habilidades() {
    const reduzirMovimento = useReducedMotion();
    // Começa com a primeira prancha aberta, para o visitante entender a interação
    const [ativa, setAtiva] = useState({ grupo: GRUPOS[0].id, nome: GRUPOS[0].habilidades[0].nome });

    const selecionar = (grupo, nome) =>
        setAtiva((atual) => (atual?.grupo === grupo && atual?.nome === nome ? null : { grupo, nome }));

    return (
        <section aria-labelledby="titulo-habilidades" className="py-20 md:py-28">
            <Reveal className="max-w-2xl">
                <h2 id="titulo-habilidades" className="font-serif text-3xl md:text-4xl">
                    Habilidades
                </h2>
                <p className="mt-4 text-lg text-oceano/80 dark:text-slate-300">
                    Escolha uma prancha para ver onde usei cada tecnologia. Todos os projetos estão no GitHub.
                </p>
            </Reveal>

            <div className="mt-12 space-y-12">
                {GRUPOS.map((grupo, indice) => {
                    const idPainel = `painel-${grupo.id}`;
                    const habilidadeAtiva =
                        ativa?.grupo === grupo.id ? grupo.habilidades.find((h) => h.nome === ativa.nome) : null;

                    return (
                        <Reveal key={grupo.id} delay={indice * 0.08}>
                            <h3 className="text-lg font-semibold">{grupo.titulo}</h3>
                            {/* "Areia" onde as pranchas ficam fincadas */}
                            <div className="mt-4 flex gap-4 overflow-x-auto border-b-4 border-dotted border-areia-escura px-1 pb-4 pt-3 dark:border-white/10">
                                {grupo.habilidades.map((habilidade) => (
                                    <Prancha
                                        key={habilidade.nome}
                                        habilidade={habilidade}
                                        cor={COR_DO_GRUPO[grupo.id]}
                                        ativa={habilidadeAtiva?.nome === habilidade.nome}
                                        onSelecionar={() => selecionar(grupo.id, habilidade.nome)}
                                        idPainel={idPainel}
                                    />
                                ))}
                            </div>
                            <AnimatePresence initial={false}>
                                {habilidadeAtiva && (
                                    <Painel
                                        key={habilidadeAtiva.nome}
                                        id={idPainel}
                                        habilidade={habilidadeAtiva}
                                        reduzirMovimento={reduzirMovimento}
                                    />
                                )}
                            </AnimatePresence>
                        </Reveal>
                    );
                })}

                {/* Em estudo: conchas, separadas das pranchas para não parecer experiência */}
                <Reveal>
                    <h3 className="text-lg font-semibold">Estudando agora</h3>
                    <ul className="mt-4 flex flex-wrap gap-3">
                        {ESTUDANDO.map((item) => (
                            <li
                                key={item.nome}
                                className="flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-[40px_40px_40px_12px] border-2 border-dashed border-[#22716F]/50 px-5 py-3 dark:border-mar/50"
                            >
                                <span className="font-semibold">{item.nome}</span>
                                <span className="text-sm text-oceano/75 dark:text-slate-300">{item.detalhe}</span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}

export default Habilidades;
