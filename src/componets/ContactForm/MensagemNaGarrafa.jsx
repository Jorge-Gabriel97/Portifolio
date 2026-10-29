import { motion, useReducedMotion } from "framer-motion";
import Ondas from "../Praia/Ondas";

/*
 * Depois do envio, o formulário "vira" uma garrafa com a mensagem enrolada dentro:
 * ela cai no mar, balança nas ondas e sai flutuando para a direita.
 */
const MotionDiv = motion.div;

function Garrafa() {
    return (
        <svg viewBox="0 0 80 150" className="h-36 w-auto drop-shadow-lg" aria-hidden="true">
            <rect x="31" y="3" width="18" height="17" rx="4" fill="#B08A5E" />
            <rect x="31" y="9" width="18" height="2" fill="#9C7A52" />
            <path
                d="M30 20 h20 v20 c0 8 16 10 16 24 v66 a14 14 0 0 1 -14 14 h-24 a14 14 0 0 1 -14 -14 v-66 c0 -14 16 -16 16 -24 z"
                fill="rgba(79, 209, 197, 0.22)"
                stroke="#2A6F78"
                strokeWidth="2.5"
            />
            {/* Mensagem enrolada, com uma fita cor de sol */}
            <rect x="27" y="66" width="26" height="62" rx="5" fill="#F4EBE1" stroke="#C4A27A" strokeWidth="1.5" transform="rotate(8 40 97)" />
            <rect x="26" y="93" width="28" height="5" rx="2" fill="#DD6B20" transform="rotate(8 40 97)" />
            <path d="M22 70 c-2 18 -2 40 0 58" stroke="rgba(255,255,255,0.65)" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
    );
}

function MensagemNaGarrafa({ aoEscreverOutra }) {
    const reduzirMovimento = useReducedMotion();

    return (
        <div role="status" className="flex w-full flex-col items-center">
            <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-transparent via-[#D3E8E3]/40 to-[#D3E8E3] dark:via-[#14505C]/30 dark:to-[#14505C]/60">
                {/* Deriva: depois de cair e assentar, a garrafa vai embora com a corrente */}
                <MotionDiv
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 md:bottom-14"
                    initial={false}
                    animate={reduzirMovimento ? {} : { x: [0, 0, 420], opacity: [1, 1, 0] }}
                    transition={{ duration: 6, times: [0, 0.35, 1], ease: "easeIn", delay: 0.4 }}
                >
                    {/* Queda: sai de onde estava o formulário e mergulha no mar */}
                    <MotionDiv
                        initial={reduzirMovimento ? false : { y: -200, rotate: -40, opacity: 0, scale: 0.6 }}
                        animate={{ y: 0, rotate: -12, opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 11, delay: 0.15 }}
                    >
                        {/* Balanço nas ondas */}
                        <MotionDiv
                            animate={reduzirMovimento ? {} : { y: [0, -7, 0], rotate: [0, 6, 0] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                        >
                            <Garrafa />
                        </MotionDiv>
                    </MotionDiv>
                </MotionDiv>
                {/* As ondas vêm depois da garrafa no código para cobrir a parte "submersa" dela */}
                <Ondas corDaFrente="fill-[#5FA3A0]/80 dark:fill-[#1F5C66]/80" />
            </div>

            <MotionDiv
                initial={reduzirMovimento ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="mt-8"
            >
                <p className="font-serif text-2xl md:text-3xl">Sua mensagem está a caminho.</p>
                <p className="mt-3 text-oceano/80 dark:text-slate-300">
                    Ela já está no mar. Assim que chegar à praia, eu respondo por e-mail.
                </p>
                <button
                    type="button"
                    onClick={aoEscreverOutra}
                    className="mt-6 cursor-pointer font-semibold text-[#22716F] underline decoration-2 underline-offset-4 hover:text-oceano focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mar dark:text-[#4FD1C5] dark:hover:text-white"
                >
                    Escrever outra mensagem
                </button>
            </MotionDiv>
        </div>
    );
}

export default MensagemNaGarrafa;
