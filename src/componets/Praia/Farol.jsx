import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { faixa } from "../../Utils/rolagem";

/*
 * FAROL à noite (banner da página Sobre). O feixe gira em volta da lanterna: em 2D isso vira um
 * scaleX que segue o cosseno do giro (aponta para a direita, "some" de frente, aponta para a esquerda).
 * Quando o feixe passa de frente para quem olha, a lanterna dá um clarão.
 * Com a rolagem, o feixe desce em direção ao conteúdo da página.
 * Fica atrás do conteúdo da seção (-z-10); a seção precisa de "relative isolate overflow-hidden".
 */
const MotionDiv = motion.div;
const MotionCircle = motion.circle;

const PASSOS = 48;
const GIRO = Array.from({ length: PASSOS + 1 }, (_, i) => (i / PASSOS) * Math.PI * 2);
const LARGURA_FEIXE = GIRO.map((t) => Math.cos(t));
const CLARAO = GIRO.map((t) => Math.max(0, Math.sin(t)) ** 6);
const VOLTA = { duration: 9, repeat: Infinity, ease: "linear" };

const ESTRELAS = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 41.3) % 100,
    y: (i * 29.7) % 58,
    tamanho: i % 6 === 0 ? 2.2 : 1.3,
    atraso: (i % 8) * 0.5,
}));

function Farol({ alvoRef }) {
    const reduzirMovimento = useReducedMotion();
    const { scrollYProgress: p } = useScroll({ target: alvoRef, offset: ["start start", "end start"] });
    const inclinacao = useTransform(p, (x) => `${faixa(x, 0, 0.6) * 22}deg`);

    return (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1E35] via-[#132B4A] to-[#2A3355]" aria-hidden="true">
            {ESTRELAS.map((e, i) => (
                <span
                    key={i}
                    className="absolute animate-pulse rounded-full bg-white/80 motion-reduce:animate-none"
                    style={{ left: `${e.x}%`, top: `${e.y}%`, width: e.tamanho, height: e.tamanho, animationDelay: `${e.atraso}s` }}
                />
            ))}

            {/* Mar escuro com o reflexo da lanterna */}
            <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-b from-[#1E3A5F] to-[#0B1E35]">
                <div className="absolute inset-x-0 top-0 h-px bg-[#FBD38D]/30" />
                <MotionDiv
                    className="absolute right-[calc(6%+2px)] top-0 h-full w-10 bg-gradient-to-b from-[#FBD38D]/50 to-transparent blur-md sm:right-[calc(10%+8px)] md:right-[calc(14%+20px)]"
                    animate={reduzirMovimento ? undefined : { opacity: CLARAO.map((c) => 0.35 + c * 0.65) }}
                    transition={VOLTA}
                />
            </div>

            {/* Farol sobre as pedras, apoiado no horizonte */}
            <div className="absolute bottom-[36%] right-[6%] h-28 w-11 translate-y-3 sm:right-[10%] sm:h-36 sm:w-14 md:right-[14%] md:h-52 md:w-20">
                {/* Feixe: nasce no centro da lanterna */}
                <div className="absolute left-1/2 top-[14.5%]">
                    <MotionDiv
                        className="origin-left"
                        style={reduzirMovimento ? { scaleX: -1 } : undefined}
                        animate={reduzirMovimento ? undefined : { scaleX: LARGURA_FEIXE, opacity: CLARAO.map((c) => 0.75 + c * 0.25) }}
                        transition={VOLTA}
                    >
                        <MotionDiv style={{ rotate: inclinacao }} className="origin-left">
                            <div className="h-24 w-[70vw] -translate-y-1/2 bg-gradient-to-r from-[#FFF3C4]/70 via-[#FBD38D]/20 to-transparent [clip-path:polygon(0_46%,100%_0,100%_100%,0_54%)]" />
                        </MotionDiv>
                    </MotionDiv>
                </div>

                <svg viewBox="0 0 80 208" className="relative h-full w-full">
                    {/* Clarão da lanterna */}
                    <defs>
                        <radialGradient id="farol-luz">
                            <stop offset="0%" stopColor="#FFF3C4" />
                            <stop offset="100%" stopColor="#FBD38D" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* Teto e lanterna */}
                    <path d="M28 22 L40 8 L52 22 Z" fill="#B7521B" />
                    <rect x="38.5" y="2" width="3" height="7" fill="#B7521B" />
                    <rect x="29" y="22" width="22" height="16" rx="2" fill="#FFE8A3" />
                    <path d="M33 22 V38 M40 22 V38 M47 22 V38" stroke="#C9A97E" strokeWidth="1" />
                    {/* Varanda */}
                    <rect x="23" y="38" width="34" height="5" rx="1.5" fill="#E7D8C6" />
                    {/* Torre listrada (afina para cima) */}
                    <clipPath id="farol-torre">
                        <path d="M27 43 H53 L60 196 H20 Z" />
                    </clipPath>
                    <g clipPath="url(#farol-torre)">
                        <rect x="0" y="43" width="80" height="160" fill="#F4EBE1" />
                        <rect x="0" y="70" width="80" height="26" fill="#B7521B" />
                        <rect x="0" y="122" width="80" height="26" fill="#B7521B" />
                        <rect x="0" y="174" width="80" height="26" fill="#B7521B" />
                        <rect x="40" y="43" width="40" height="160" fill="#0B1E35" opacity="0.25" />
                    </g>
                    <rect x="37" y="56" width="6" height="9" rx="3" fill="#FFE8A3" opacity="0.85" />
                    {/* Pedras */}
                    <path d="M4 208 Q8 192 22 192 Q30 184 42 190 Q56 184 64 194 Q76 194 78 208 Z" fill="#132B4A" />
                    {/* O clarão fica por cima de tudo */}
                    <MotionCircle
                        cx="40"
                        cy="30"
                        r="26"
                        fill="url(#farol-luz)"
                        initial={{ opacity: 0.5 }}
                        animate={reduzirMovimento ? undefined : { opacity: CLARAO.map((c) => 0.35 + c * 0.65) }}
                        transition={VOLTA}
                    />
                </svg>
            </div>
        </div>
    );
}

export default Farol;
