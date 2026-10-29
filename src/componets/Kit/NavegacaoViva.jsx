import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { rolarPara } from "../../Utils/rolagem";
import { useSecoes } from "./useSecoes";

/*
 * NAVEGAÇÃO VIVA (inspirada no seasats.com)
 * No topo da página, um menu de blocos ao lado do Hero: passar o mouse abre uma prévia, e o bloco
 * da seção em leitura fica aceso e vai se enchendo. Ao rolar, cada bloco de seção "voa" e vira um
 * trecho da barra de progresso na borda direita (layoutId do Framer); ao voltar ao topo, o caminho inverso.
 * Em telas menores que xl não há menu: a barra aparece sozinha depois de um pouco de rolagem.
 * ✏️ Itens, descrições e cores em src/dados/navegacao.js.
 */
const MotionA = motion.a;
const MotionDiv = motion.div;
const MotionSpan = motion.span;
const MotionLink = motion.create(Link);

const TELA_LARGA = "(min-width: 1280px)";

function useTelaLarga() {
    const [larga, setLarga] = useState(() => window.matchMedia(TELA_LARGA).matches);
    useEffect(() => {
        const consulta = window.matchMedia(TELA_LARGA);
        const aoMudar = () => setLarga(consulta.matches);
        consulta.addEventListener("change", aoMudar);
        return () => consulta.removeEventListener("change", aoMudar);
    }, []);
    return larga;
}

// Linha de onda que se desenha na base do bloco quando o mouse passa
function OndaDoBloco() {
    return (
        <svg viewBox="0 0 120 8" preserveAspectRatio="none" className="absolute inset-x-5 bottom-2 h-2" aria-hidden="true">
            <path
                d="M0 4 Q 7.5 0 15 4 T 30 4 T 45 4 T 60 4 T 75 4 T 90 4 T 105 4 T 120 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="160"
                className="opacity-50 transition-[stroke-dashoffset] duration-700 ease-out [stroke-dashoffset:160] group-hover/bloco:[stroke-dashoffset:0] group-focus-visible/bloco:[stroke-dashoffset:0]"
            />
        </svg>
    );
}

function Bloco({ item, indice, total, aceso, progressoAtivo, comLayoutId, entrada }) {
    const ehSecao = !item.to;
    const cantos = `${indice === 0 ? "rounded-t-[40px]" : ""} ${indice === total - 1 ? "rounded-b-3xl" : ""}`;
    const classe = `group/bloco relative flex min-h-0 grow basis-0 flex-col justify-center overflow-hidden px-5 py-3 text-sm font-medium transition-[flex-grow,filter] duration-500 ease-out hover:grow-[2.4] focus-visible:grow-[2.4] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current ${cantos} ${item.bloco}`;

    const escondido = entrada === "escondido";
    const animacao = {
        layoutId: comLayoutId && ehSecao ? `nav-${item.id}` : undefined,
        // Escondido: os blocos de seção somem na hora (o trecho da barra assume o lugar); os de página desbotam
        initial: entrada === "chegada" ? { opacity: 0, x: 32 } : escondido && !ehSecao ? { opacity: 1 } : false,
        animate: { opacity: escondido ? 0 : 1, x: 0 },
        transition: {
            duration: escondido ? 0.3 : 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: entrada === "chegada" ? 0.15 + indice * 0.06 : 0,
        },
    };

    const conteudo = (
        // Na volta da barra o texto espera o bloco terminar de crescer, para não aparecer esticado
        <MotionSpan
            className="relative flex flex-col"
            initial={entrada === "volta" ? { opacity: 0 } : false}
            animate={{ opacity: 1, transition: { delay: entrada === "volta" ? 0.35 : 0 } }}
        >
            <span className="flex items-center gap-2">
                {item.numero && <span className="font-mono text-xs opacity-70">{item.numero}</span>}
                {item.nome}
                {aceso && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" aria-hidden="true" />}
                <span
                    className="ml-auto opacity-60 transition-transform duration-500 group-hover/bloco:translate-x-0.5 group-hover/bloco:opacity-100"
                    aria-hidden="true"
                >
                    {ehSecao ? "↓" : "↗"}
                </span>
            </span>
            <span className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover/bloco:grid-rows-[1fr] group-hover/bloco:opacity-80 group-focus-visible/bloco:grid-rows-[1fr] group-focus-visible/bloco:opacity-80">
                <span className="overflow-hidden pt-1 text-xs font-normal">{item.descricao}</span>
            </span>
        </MotionSpan>
    );

    // A seção em leitura "enche de água" de baixo para cima, conforme a rolagem avança nela
    const enchimento = aceso && (
        <MotionSpan
            style={{ scaleY: progressoAtivo }}
            className="absolute inset-0 origin-bottom bg-gradient-to-t from-current/20 to-current/5"
            aria-hidden="true"
        />
    );

    if (!ehSecao) {
        return (
            <MotionLink to={item.to} className={classe} {...animacao}>
                {conteudo}
                <OndaDoBloco />
            </MotionLink>
        );
    }
    return (
        <MotionA
            href={`#${item.id}`}
            onClick={(e) => {
                e.preventDefault();
                rolarPara(item.id);
            }}
            aria-current={aceso ? "location" : undefined}
            className={classe}
            {...animacao}
        >
            {enchimento}
            {conteudo}
            <OndaDoBloco />
        </MotionA>
    );
}

function Barra({ trechos, posicao, ativa, mudouEm, visivel, morfar }) {
    const topoMarcador = useTransform(posicao, (p) => `${p * 100}%`);
    // Véu sobre o que ainda não foi lido: só a parte abaixo do marcador
    const veu = useTransform(posicao, (p) => `inset(${p * 100}% 0 0 0)`);
    const rotuloAtual = trechos[ativa];

    // Ao entrar numa seção nova, o nome dela aparece ao lado do marcador por alguns segundos
    const [ocultoEm, setOcultoEm] = useState(0);
    useEffect(() => {
        const espera = setTimeout(() => setOcultoEm(mudouEm), 2200);
        return () => clearTimeout(espera);
    }, [mudouEm]);
    const mostrarRotulo = visivel && mudouEm > 0 && ocultoEm !== mudouEm;

    const montarTrechos = visivel || !morfar;

    return (
        <nav
            aria-label="Progresso da página"
            inert={!visivel}
            className={`group/barra fixed bottom-8 right-2.5 top-24 z-40 hidden w-1.5 transition-opacity duration-500 md:block ${
                visivel ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            {montarTrechos &&
                trechos.map((t) => (
                    <MotionSpan
                        key={t.id}
                        layoutId={morfar ? `nav-${t.id}` : undefined}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-x-0 rounded-full"
                        style={{ top: `${t.inicio * 100}%`, height: `calc(${t.tamanho * 100}% - 3px)`, backgroundColor: t.cor }}
                        aria-hidden="true"
                    />
                ))}

            {montarTrechos && (
                <MotionDiv style={{ clipPath: veu }} className="absolute inset-0" aria-hidden="true">
                    {trechos.map((t) => (
                        <span
                            key={t.id}
                            className="absolute inset-x-0 rounded-full bg-areia/45 dark:bg-oceano-fundo/45"
                            style={{ top: `${t.inicio * 100}%`, height: `calc(${t.tamanho * 100}% - 3px)` }}
                        />
                    ))}
                </MotionDiv>
            )}

            <MotionDiv style={{ top: topoMarcador }} className="absolute right-3 -translate-y-1/2" aria-hidden="true">
                <span className="block text-[10px] leading-none text-oceano/70 dark:text-areia/70">▶</span>
                <AnimatePresence>
                    {rotuloAtual && mostrarRotulo && (
                        <MotionSpan
                            key={rotuloAtual.id}
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.35 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded border border-oceano/15 bg-areia/95 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-oceano shadow-sm dark:border-white/15 dark:bg-oceano-fundo/95 dark:text-areia"
                        >
                            {rotuloAtual.numero && <span className="mr-1.5 opacity-60">{rotuloAtual.numero}</span>}
                            {rotuloAtual.nome}
                        </MotionSpan>
                    )}
                </AnimatePresence>
            </MotionDiv>

            {/* Áreas clicáveis por cima dos trechos; o nome de cada uma aparece ao passar o mouse na barra */}
            <ul>
                {trechos.map((t) => (
                    <li key={t.id} className="absolute -inset-x-2" style={{ top: `${t.inicio * 100}%`, height: `${t.tamanho * 100}%` }}>
                        <button
                            type="button"
                            onClick={() => rolarPara(t.id)}
                            className="peer h-full w-full cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-mar"
                        >
                            <span className="sr-only">Ir para {t.nome}</span>
                        </button>
                        <span
                            className="pointer-events-none absolute right-6 top-0 whitespace-nowrap rounded border border-oceano/15 bg-areia/95 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-oceano opacity-0 shadow-sm transition-opacity group-hover/barra:opacity-100 peer-focus-visible:opacity-100 dark:border-white/15 dark:bg-oceano-fundo/95 dark:text-areia"
                            aria-hidden="true"
                        >
                            {t.numero && <span className="mr-1.5 opacity-60">{t.numero}</span>}
                            {t.nome}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

function NavegacaoViva({ nav }) {
    const { trechos, posicao, ativa, progressoAtivo, mudouEm } = useSecoes(nav.barra);
    const larga = useTelaLarga();
    const menuRef = useRef(null);
    const [menuNaTela, setMenuNaTela] = useState(true);
    const [rolou, setRolou] = useState(false);
    // "chegada" na primeira montagem; "volta" quando os blocos voltam da barra
    const [entrada, setEntrada] = useState("chegada");
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (y) => setRolou(y > window.innerHeight * 0.6));

    // O menu vira barra quando mais da metade dele já saiu da tela
    useEffect(() => {
        if (!larga || !menuRef.current) return undefined;
        const observador = new IntersectionObserver(([e]) => {
            const naTela = e.intersectionRatio >= 0.5;
            setMenuNaTela(naTela);
            if (!naTela) setEntrada("volta");
        }, {
            threshold: [0, 0.5, 1],
            rootMargin: "-80px 0px 0px 0px",
        });
        observador.observe(menuRef.current);
        return () => observador.disconnect();
    }, [larga]);

    const recolhido = larga && !menuNaTela;

    const idAceso = trechos[ativa]?.id;

    return (
        <>
            <nav ref={menuRef} aria-label="Seções e páginas" inert={recolhido} className="hidden xl:flex xl:flex-col">
                {nav.menu.map((item, i) => (
                    // A chave muda ao recolher: o bloco remonta sem layoutId e o trecho da barra herda a animação
                    <Bloco
                        key={`${item.id ?? item.to}-${recolhido}`}
                        item={item}
                        indice={i}
                        total={nav.menu.length}
                        aceso={!item.to && item.id === idAceso}
                        progressoAtivo={progressoAtivo}
                        comLayoutId={!recolhido}
                        entrada={recolhido ? "escondido" : entrada}
                    />
                ))}
            </nav>
            <Barra trechos={trechos} posicao={posicao} ativa={ativa} mudouEm={mudouEm} visivel={larga ? recolhido : rolou} morfar={larga} />
        </>
    );
}

export default NavegacaoViva;
