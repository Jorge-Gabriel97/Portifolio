import { useEffect, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const limitar = (v) => Math.min(1, Math.max(0, v));

/*
 * Mede as seções da página e acompanha a leitura:
 *  - trechos: posição e tamanho de cada seção, como fração da página inteira;
 *  - posicao: onde está o meio da tela, na mesma escala (0 a 1);
 *  - ativa: índice da seção em que o meio da tela está;
 *  - progressoAtivo: quanto da seção ativa já foi lido (0 a 1);
 *  - mudouEm: momento (Date.now) da última troca de seção, para avisos passageiros.
 */
export function useSecoes(secoes) {
    const [trechos, setTrechos] = useState([]);
    const [ativa, setAtiva] = useState(0);
    const [mudouEm, setMudouEm] = useState(0);
    const ativaAtual = useRef(0);
    const alturaTotal = useRef(1);
    const progressoAtivo = useMotionValue(0);
    const { scrollY } = useScroll();

    useEffect(() => {
        const medir = () => {
            const total = document.documentElement.scrollHeight;
            alturaTotal.current = total;
            setTrechos(
                secoes
                    .map((secao) => {
                        const el = document.getElementById(secao.id);
                        if (!el) return null;
                        const caixa = el.getBoundingClientRect();
                        return { ...secao, inicio: (caixa.top + window.scrollY) / total, tamanho: caixa.height / total };
                    })
                    .filter(Boolean),
            );
        };
        medir();
        // A página muda de altura quando os projetos do GitHub chegam ou a tela é redimensionada
        const observador = new ResizeObserver(medir);
        observador.observe(document.body);
        return () => observador.disconnect();
    }, [secoes]);

    const posicao = useTransform(scrollY, (y) => limitar((y + window.innerHeight / 2) / alturaTotal.current));

    useMotionValueEvent(posicao, "change", (p) => {
        let indice = 0;
        trechos.forEach((t, i) => {
            if (p >= t.inicio) indice = i;
        });
        const t = trechos[indice];
        if (!t) return;
        if (indice !== ativaAtual.current) {
            ativaAtual.current = indice;
            setAtiva(indice);
            setMudouEm(Date.now());
        }
        progressoAtivo.set(limitar((p - t.inicio) / t.tamanho));
    });

    return { trechos, posicao, ativa, progressoAtivo, mudouEm };
}
