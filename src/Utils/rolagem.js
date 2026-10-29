import { useCallback, useRef } from "react";
import { useScroll } from "framer-motion";

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
export function useSecaoFixada() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

    // Rola a página até o ponto da seção em que o progresso vale "fracao"
    const irPara = useCallback((fracao) => {
        const secao = ref.current;
        const percurso = secao.offsetHeight - window.innerHeight;
        const topo = secao.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: topo + percurso * fracao, behavior: "smooth" });
    }, []);

    return { ref, progresso: scrollYProgress, irPara };
}
