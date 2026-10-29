import { useContext, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useTransform,
} from "framer-motion";
import ParticulasTitulo from "./ParticulasTitulo";
import Camadas, { AmostraTraco } from "./Camadas";
import Ondas from "../Praia/Ondas";
import Rotulo from "../Kit/Rotulo";
import ChipRepositorio from "../Kit/ChipRepositorio";
import { AppContext } from "../contexts/AppContext.js";
import { ESTUDANDO, GRUPOS } from "../Habilidades/dadosHabilidades";
import { faixa, useSecaoFixada } from "../../Utils/rolagem";

/*
 * TECNOLOGIA: um mergulho pela stack.
 * A seção fica presa na tela enquanto a rolagem conta a história: o título se forma com grãos
 * de areia e depois cada camada da stack aparece como uma profundidade do mar, com o fundo
 * escurecendo a cada descida. No celular e com "reduzir movimento" vira uma lista simples.
 *
 * ✏️ Tecnologias e projetos ficam em ../Habilidades/dadosHabilidades.js.
 */
const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionSpan = motion.span;

const TOTAL = GRUPOS.length;
// Parte da rolagem usada pelo título; o resto é dividido igualmente entre as camadas
const INICIO_CAMADAS = 0.3;
const PROFUNDIDADE_MAXIMA = 40;

// Na mesma ordem de GRUPOS. "agua" é a cor do fundo naquela profundidade, no tema claro e no escuro.
const PROFUNDIDADES = [
    { nome: "Superfície", agua: { claro: "#D3E8E3", escuro: "#14505C" } },
    { nome: "Meia-água", agua: { claro: "#2A6F78", escuro: "#123F5A" } },
    { nome: "Fundo", agua: { claro: "#17405F", escuro: "#0D2A46" } },
    { nome: "Leito", agua: { claro: "#0B1E35", escuro: "#08172A" } },
];
const PRAIA = { claro: "#F4EBE1", escuro: "#0F2440" };

const GRAOS = {
    claro: ["#B08A5E", "#C4A27A", "#C4A27A", "#9C7A52", "#1A365D", "#319795", "#DD6B20"],
    escuro: ["#F4EBE1", "#E7D8C6", "#D9C3A5", "#4FD1C5", "#F6AD55"],
};

const numero = (n) => String(n).padStart(2, "0");
const inicioDaCamada = (indice) => INICIO_CAMADAS + (indice * (1 - INICIO_CAMADAS)) / TOTAL;

function misturar(corA, corB, t) {
    const a = parseInt(corA.slice(1), 16);
    const b = parseInt(corB.slice(1), 16);
    const canal = (desloc) => Math.round(((a >> desloc) & 255) * (1 - t) + ((b >> desloc) & 255) * t);
    return `rgb(${canal(16)}, ${canal(8)}, ${canal(0)})`;
}

// A água muda de cor rápido perto da troca de camada e fica parada no meio dela
function corDaAgua(p, tema) {
    const cores = [PRAIA[tema], ...PROFUNDIDADES.map((prof) => prof.agua[tema])];
    const inicios = [0, ...GRUPOS.map((_, i) => inicioDaCamada(i))];
    let cor = cores[0];
    for (let i = 1; i < cores.length; i++) {
        const t = faixa(p, inicios[i] - 0.04, inicios[i] + 0.01);
        if (t > 0) cor = misturar(cores[i - 1], cores[i], t);
    }
    return cor;
}

// Texto claro sobre água escura; no tema claro, a superfície ainda é clara
const fundoEscuro = (indice, temaEscuro) => temaEscuro || indice >= 1;

function cores(escuro) {
    return escuro
        ? {
              texto: "text-areia",
              suave: "text-areia/65",
              acento: "text-[#F6AD55]",
          }
        : {
              texto: "text-oceano",
              suave: "text-oceano/70",
              acento: "text-coral",
          };
}

function ListaHabilidades({ grupo, escuro }) {
    const c = cores(escuro);
    return (
        <ul className="space-y-3 text-sm">
            {grupo.habilidades.map((h) => (
                <li key={h.nome}>
                    <p>
                        <span className={`font-medium ${c.texto}`}>{h.nome}</span>
                        <span className={c.suave}> · {h.detalhe}</span>
                    </p>
                    <ul className="mt-1.5 flex flex-wrap gap-1.5">
                        {h.projetos.map((repo) => (
                            <li key={repo}>
                                <ChipRepositorio repo={repo} fundo={escuro ? "escuro" : "claro"} />
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}

function Legenda({ ativa, escuro, aoEscolher }) {
    const c = cores(escuro);
    return (
        <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3">
            {GRUPOS.map((grupo, i) => (
                <li key={grupo.id}>
                    <button
                        type="button"
                        onClick={() => aoEscolher(i)}
                        aria-current={i === ativa ? "true" : undefined}
                        className={`flex items-center gap-4 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                            i === ativa ? c.acento : `${c.suave} hover:opacity-100`
                        }`}
                    >
                        <AmostraTraco indice={i} ativa={i === ativa} escuro={escuro} />
                        <span>
                            {grupo.titulo}
                            <span className="ml-2 font-mono text-[10px] uppercase tracking-wider opacity-70">
                                {PROFUNDIDADES[i].nome}
                            </span>
                        </span>
                    </button>
                </li>
            ))}
        </ul>
    );
}

// Medidor de profundidade na lateral, no lugar de uma barra de progresso.
// Marcas fixas à direita da linha e a leitura atual à esquerda, para uma não cobrir a outra.
function Profundimetro({ progresso, escuro, opacidade }) {
    const fracao = useTransform(progresso, (p) => faixa(p, INICIO_CAMADAS, 1));
    const topo = useTransform(fracao, (f) => `${f * 100}%`);
    const metros = useTransform(fracao, (f) => `${numero(Math.round(f * PROFUNDIDADE_MAXIMA))} m`);
    const c = cores(escuro);
    const marcas = [0, 10, 20, 30, 40];

    return (
        <MotionDiv
            style={{ opacity: opacidade }}
            className={`absolute right-8 top-1/2 hidden h-[52vh] -translate-y-1/2 gap-3 font-mono text-[10px] uppercase tracking-wider transition-colors duration-500 lg:flex ${escuro ? "text-areia/55" : "text-oceano/60"}`}
            aria-hidden="true"
        >
            <div className="relative w-px bg-current opacity-60">
                <MotionDiv style={{ top: topo }} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className={`block h-2.5 w-2.5 rotate-45 border ${escuro ? "border-[#F6AD55] bg-[#F6AD55]/30" : "border-coral bg-coral/20"}`} />
                    <MotionSpan className={`absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-medium ${c.acento}`}>
                        {metros}
                    </MotionSpan>
                </MotionDiv>
            </div>
            <div className="flex flex-col justify-between text-left">
                {marcas.map((m) => (
                    <span key={m}>{numero(m)} m</span>
                ))}
            </div>
        </MotionDiv>
    );
}

function VersaoFixada({ temaEscuro }) {
    const { ref, progresso: scrollYProgress, irPara } = useSecaoFixada();
    const [ativa, setAtiva] = useState(0);
    const [submerso, setSubmerso] = useState(false);

    const tema = temaEscuro ? "escuro" : "claro";
    const fundo = useTransform(scrollYProgress, (p) => corDaAgua(p, tema));
    const abertura = useTransform(scrollYProgress, (p) => faixa(p, 0.26, 0.38));
    const opacidadeCamadas = useTransform(scrollYProgress, (p) => faixa(p, 0.24, 0.31));
    // Escondida de verdade (não só transparente), para os links não receberem foco nem clique
    const visibilidadeCamadas = useTransform(opacidadeCamadas, (o) => (o < 0.05 ? "hidden" : "visible"));
    const opacidadeSubtitulo = useTransform(scrollYProgress, (p) => faixa(p, 0.05, 0.14) - faixa(p, 0.2, 0.25));

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        const indice = Math.floor(((p - INICIO_CAMADAS) / (1 - INICIO_CAMADAS)) * TOTAL);
        setAtiva(Math.min(TOTAL - 1, Math.max(0, indice)));
        // Troca a cor do texto no meio da transição da água
        setSubmerso(p >= inicioDaCamada(1) - 0.015);
    });

    const escuro = temaEscuro || submerso;
    const c = cores(escuro);
    const grupo = GRUPOS[ativa];

    return (
        <MotionDiv ref={ref} style={{ backgroundColor: fundo }} className="relative h-[560vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <ParticulasTitulo texto="Tecnologia" cores={GRAOS[tema]} progresso={scrollYProgress} />

                <MotionP
                    style={{ opacity: opacidadeSubtitulo }}
                    className={`absolute inset-x-0 top-[60%] px-6 text-center text-lg ${temaEscuro ? "text-areia/75" : "text-oceano/75"}`}
                >
                    Um mergulho pelas camadas com que construo software, da superfície ao leito.
                </MotionP>

                <MotionDiv
                    style={{ opacity: opacidadeCamadas, visibility: visibilidadeCamadas }}
                    className="container grid h-full grid-cols-[minmax(0,6fr)_minmax(0,6fr)] items-center gap-10 pb-20 pt-28"
                >
                    <AnimatePresence mode="wait">
                        <MotionDiv
                            key={grupo.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            aria-live="polite"
                        >
                            <Rotulo fundo={escuro ? "escuro" : "claro"}>
                                {numero(ativa + 1)} · {PROFUNDIDADES[ativa].nome}
                            </Rotulo>
                            <h3
                                className={`mt-3 text-2xl font-medium leading-tight transition-colors duration-500 lg:text-3xl xl:text-[2.1rem] [@media(max-height:800px)]:text-2xl ${c.texto}`}
                            >
                                <span className={`font-serif ${c.acento}`}>{grupo.titulo}</span>
                                <br />
                                {grupo.resumo}
                            </h3>
                            <div className="mt-6 max-w-xl [@media(max-height:800px)]:mt-4">
                                <ListaHabilidades grupo={grupo} escuro={escuro} />
                            </div>
                        </MotionDiv>
                    </AnimatePresence>

                    <div className="flex flex-col items-center">
                        <Camadas total={TOTAL} abertura={abertura} ativa={ativa} escuro={escuro} />
                        <Legenda ativa={ativa} escuro={escuro} aoEscolher={(i) => irPara(inicioDaCamada(i) + 0.02)} />
                    </div>
                </MotionDiv>

                <Profundimetro progresso={scrollYProgress} escuro={escuro} opacidade={opacidadeCamadas} />
            </div>
        </MotionDiv>
    );
}

function VersaoLista({ temaEscuro }) {
    const c = cores(temaEscuro);
    return (
        <div className="container pt-20">
            <p aria-hidden="true" className={`font-serif text-5xl ${c.texto}`}>
                Tecnologia
            </p>
            <p className={`mt-4 text-lg ${c.suave}`}>
                Um mergulho pelas camadas com que construo software, da superfície ao leito.
            </p>
            <ol className="mt-12 space-y-6">
                {GRUPOS.map((grupo, i) => {
                    const escuro = fundoEscuro(i, temaEscuro);
                    const ci = cores(escuro);
                    return (
                        <li
                            key={grupo.id}
                            style={{ backgroundColor: PROFUNDIDADES[i].agua[temaEscuro ? "escuro" : "claro"] }}
                            className="rounded-3xl p-6"
                        >
                            <div className="flex items-center gap-4">
                                <AmostraTraco indice={i} ativa escuro={escuro} />
                                <Rotulo fundo={escuro ? "escuro" : "claro"}>
                                    {numero(i + 1)} · {PROFUNDIDADES[i].nome}
                                </Rotulo>
                            </div>
                            <h3 className={`mt-4 text-2xl font-medium leading-snug ${ci.texto}`}>
                                <span className={`font-serif ${ci.acento}`}>{grupo.titulo}</span>
                                <br />
                                {grupo.resumo}
                            </h3>
                            <div className="mt-6">
                                <ListaHabilidades grupo={grupo} escuro={escuro} />
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

function Tecnologia() {
    const reduzirMovimento = useReducedMotion();
    const { isDarkMode } = useContext(AppContext);
    const leito = PROFUNDIDADES[TOTAL - 1].agua[isDarkMode ? "escuro" : "claro"];

    return (
        <section id="tecnologia" aria-labelledby="titulo-tecnologia">
            <h2 id="titulo-tecnologia" className="sr-only">
                Tecnologia
            </h2>

            {!reduzirMovimento && (
                <div className="hidden md:block">
                    <VersaoFixada temaEscuro={isDarkMode} />
                </div>
            )}
            <div className={reduzirMovimento ? "" : "md:hidden"}>
                <VersaoLista temaEscuro={isDarkMode} />
            </div>

            {/* Volta do mergulho: as ondas devolvem a página para a areia */}
            <div style={{ backgroundColor: leito }} className="relative pb-36 pt-16 md:pb-44">
                <div className="container">
                    <Rotulo fundo="escuro">Estudando agora</Rotulo>
                    <ul className="mt-4 flex flex-wrap gap-3">
                        {ESTUDANDO.map((item) => (
                            <li
                                key={item.nome}
                                className="flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-dashed border-white/25 px-5 py-2.5 text-areia"
                            >
                                <span className="font-medium">{item.nome}</span>
                                <span className="text-sm text-areia/65">{item.detalhe}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <Ondas />
            </div>
        </section>
    );
}

export default Tecnologia;
