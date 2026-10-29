import { motion, useTransform } from "framer-motion";

const MotionG = motion.g;

const CX = 320;
const CY = 290;
const LARGURA = 230;
const ALTURA = 100;
const ESPESSURA = 10;

// Cores conforme o fundo por trás: areia/água clara ou mar profundo
const PALETA = {
    claro: {
        ativa: "#B7521B",
        inativa: "rgba(26, 54, 93, 0.38)",
        topo: "rgba(255, 255, 255, 0.55)",
        topoAtivo: "rgba(221, 107, 32, 0.12)",
        lado: "rgba(26, 54, 93, 0.1)",
        amostra: "rgba(26, 54, 93, 0.6)",
    },
    escuro: {
        ativa: "#F6AD55",
        inativa: "rgba(244, 235, 225, 0.32)",
        topo: "rgba(8, 24, 43, 0.6)",
        topoAtivo: "rgba(246, 173, 85, 0.12)",
        lado: "rgba(8, 24, 43, 0.75)",
        amostra: "rgba(244, 235, 225, 0.6)",
    },
};

// Cada profundidade tem um "desenho de água": ondas na superfície, que vão se acalmando até o leito
const ESTILOS = [
    { ondas: 5, amplitude: 0.03, traco: {} },
    { ondas: 4, amplitude: 0.015, traco: {} },
    { ondas: 3, amplitude: 0.006, traco: { strokeDasharray: "0.01 6", strokeLinecap: "round", strokeWidth: 2.5 } },
    { ondas: 2, amplitude: 0, traco: { strokeDasharray: "10 7" } },
];

const losango = `${CX - LARGURA},0 ${CX},${-ALTURA} ${CX + LARGURA},0 ${CX},${ALTURA}`;
const ladoEsquerdo = `${CX - LARGURA},0 ${CX},${ALTURA} ${CX},${ALTURA + ESPESSURA} ${CX - LARGURA},${ESPESSURA}`;
const ladoDireito = `${CX},${ALTURA} ${CX + LARGURA},0 ${CX + LARGURA},${ESPESSURA} ${CX},${ALTURA + ESPESSURA}`;

// Ponto (u, v) da placa em perspectiva isométrica: u anda para o fundo, v para a frente
const ponto = (u, v) => [CX - LARGURA + LARGURA * (u + v), ALTURA * (v - u)];

function linhaDeOnda(v, amplitude, fase) {
    const pontos = [];
    for (let i = 0; i <= 48; i++) {
        const u = 0.04 + (i / 48) * 0.92;
        pontos.push(ponto(u, v + amplitude * Math.sin(u * Math.PI * 6 + fase)).join(","));
    }
    return pontos.join(" ");
}

function Camada({ indice, total, abertura, ativa, cores }) {
    // Fechadas, as placas formam um bloco só; ao rolar, se separam
    const y = useTransform(abertura, (a) => CY + (indice - (total - 1) / 2) * (26 + 74 * a));
    const { ondas, amplitude, traco } = ESTILOS[indice];
    const cor = ativa ? cores.ativa : cores.inativa;

    return (
        <MotionG style={{ y }}>
            <MotionG animate={{ y: ativa ? -16 : 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                <polygon points={ladoEsquerdo} fill={cores.lado} stroke={cor} strokeWidth={1} />
                <polygon points={ladoDireito} fill={cores.lado} stroke={cor} strokeWidth={1} />
                <polygon points={losango} fill={ativa ? cores.topoAtivo : cores.topo} />
                <polygon points={losango} fill="none" stroke={cor} strokeWidth={1.5} {...traco} />
                {Array.from({ length: ondas }, (_, k) => (
                    <polyline
                        key={k}
                        points={linhaDeOnda((k + 1) / (ondas + 1), amplitude, k * 1.7)}
                        fill="none"
                        stroke={cor}
                        strokeWidth={1}
                        opacity={ativa ? 0.7 : 0.45}
                        {...traco}
                    />
                ))}
            </MotionG>
        </MotionG>
    );
}

function Camadas({ total, abertura, ativa, escuro }) {
    const cores = escuro ? PALETA.escuro : PALETA.claro;
    // Desenha de baixo para cima, para a placa de cima cobrir as de baixo
    const indices = Array.from({ length: total }, (_, i) => total - 1 - i);
    return (
        <svg viewBox="0 0 640 580" className="h-auto max-h-[56vh] w-full max-w-[640px]" aria-hidden="true">
            {indices.map((i) => (
                <Camada key={i} indice={i} total={total} abertura={abertura} ativa={i === ativa} cores={cores} />
            ))}
        </svg>
    );
}

export function AmostraTraco({ indice, ativa, escuro }) {
    const cores = escuro ? PALETA.escuro : PALETA.claro;
    const { amplitude, traco } = ESTILOS[indice];
    const onda = Array.from({ length: 26 }, (_, i) => `${2 + i * 2.72},${5 + amplitude * 80 * Math.sin(i * 0.9)}`).join(" ");
    return (
        <svg viewBox="0 0 72 10" className="h-2.5 w-[72px] shrink-0" aria-hidden="true">
            <polyline points={onda} fill="none" stroke={ativa ? cores.ativa : cores.amostra} strokeWidth={1.5} {...traco} />
        </svg>
    );
}

export default Camadas;
