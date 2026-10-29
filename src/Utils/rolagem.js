import { useCallback, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "lenis";

// Quanto p já andou entre "de" e "ate", de 0 a 1
export const faixa = (p, de, ate) => Math.min(1, Math.max(0, (p - de) / (ate - de)));

/*
 * Seção alta com um bloco "sticky" dentro: o progresso vai de 0 (topo da seção no topo da tela)
 * a 1 (fim da seção no fim da tela).
 *
 * Use useTransform com função, ex.: useTransform(progresso, (p) => faixa(p, 0.2, 0.3)).
 * Com faixas em array ([0.2, 0.3], [0, 1]) o Framer entrega a opacidade para o navegador animar
 * sozinho (ScrollTimeline), que calcula errado dentro de seções fixadas.
 */
let lenis = null;

const pedeMenosMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
 * Rolagem suave (Lenis, a mesma do seasats.com): a página "desliza" em vez de pular.
 * Fica desligada para quem pede menos movimento no sistema. Chamada uma vez, em App.
 */
export function iniciarRolagemSuave() {
    if (lenis || pedeMenosMovimento()) return () => {};
    lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    return () => {
        lenis.destroy();
        lenis = null;
    };
}

// Rola até a posição "topo" (px). imediato: sem animação, para trocas de página.
export function rolarAte(topo, { imediato = false } = {}) {
    if (lenis) {
        lenis.scrollTo(topo, { immediate: imediato, force: true });
        return;
    }
    window.scrollTo({ top: topo, behavior: imediato || pedeMenosMovimento() ? "auto" : "smooth" });
}

export function useSecaoFixada() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

    // Rola a página até o ponto da seção em que o progresso vale "fracao"
    const irPara = useCallback((fracao) => {
        const secao = ref.current;
        const percurso = secao.offsetHeight - window.innerHeight;
        const topo = secao.getBoundingClientRect().top + window.scrollY;
        rolarAte(topo + percurso * fracao);
    }, []);

    return { ref, progresso: scrollYProgress, irPara };
}

// Rola até a seção com esse id, respeitando o scroll-margin dela (espaço do cabeçalho).
// O topo da página não precisa de seção: "inicio" volta ao começo.
export function rolarPara(id) {
    if (id === "inicio") {
        rolarAte(0);
        return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const margem = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    rolarAte(el.getBoundingClientRect().top + window.scrollY - margem);
}
