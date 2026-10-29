import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/*
 * Título que se revela palavra por palavra: cada palavra sobe de dentro de uma "máscara",
 * em cascata, como uma linha de texto subindo da água.
 * Leitores de tela leem o texto inteiro (aria-label); as palavras soltas ficam escondidas deles.
 *
 * Props: texto, como ("h1", "h2"...), id, className, atraso (s) e
 * aoCarregar: anima ao montar (topo da página) em vez de ao entrar na tela.
 */
const MotionSpan = motion.span;

function TextoRevelado({ texto, como = "h2", id, className = "", atraso = 0, aoCarregar = false, ...props }) {
    const reduzirMovimento = useReducedMotion();
    const Tag = como;
    // Quem observa a tela é o título inteiro: cada palavra começa escondida dentro da própria
    // máscara (overflow-hidden), e o navegador a consideraria sempre fora da tela
    const ref = useRef(null);
    const naTela = useInView(ref, { once: true, amount: 0.6 });

    if (reduzirMovimento) {
        return (
            <Tag id={id} className={className} {...props}>
                {texto}
            </Tag>
        );
    }

    const revelar = aoCarregar || naTela;
    const palavras = texto.split(" ");

    return (
        <Tag ref={ref} id={id} className={className} aria-label={texto} {...props}>
            {palavras.map((palavra, i) => (
                <span key={`${palavra}-${i}`} aria-hidden="true">
                    {/* O respiro embaixo (pb/-mb) evita cortar letras como "ç", "g" e "p" */}
                    <span className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom">
                        <MotionSpan
                            className="inline-block"
                            initial={{ y: "115%" }}
                            animate={{ y: revelar ? "0%" : "115%" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: atraso + i * 0.05 }}
                        >
                            {palavra}
                        </MotionSpan>
                    </span>
                    {i < palavras.length - 1 && " "}
                </span>
            ))}
        </Tag>
    );
}

export default TextoRevelado;
