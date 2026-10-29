import { useEffect, useRef } from "react";

const MAX_PARTICULAS = 4200;
// Trechos da rolagem da seção (0 a 1) em que o título se monta e se desfaz
const MONTAR = [0, 0.15];
const DESFAZER = [0.22, 0.3];

const limitar = (v) => Math.min(1, Math.max(0, v));
const suavizar = (t) => 1 - Math.pow(1 - t, 3);

function gaussiana() {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Lê os pixels do texto desenhado num canvas invisível: cada pixel aceso vira o destino de uma partícula.
function pontosDoTexto(texto, largura, altura) {
    const tamanho = Math.min(largura * 0.17, 200);
    const canvas = document.createElement("canvas");
    canvas.width = largura;
    canvas.height = altura;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `400 ${tamanho}px "DM Serif Display", serif`;
    ctx.fillText(texto, largura / 2, altura * 0.46);

    const { data } = ctx.getImageData(0, 0, largura, altura);
    const passo = Math.max(2, Math.round(tamanho / 45));
    const pontos = [];
    for (let y = 0; y < altura; y += passo) {
        for (let x = 0; x < largura; x += passo) {
            if (data[(y * largura + x) * 4 + 3] > 128) pontos.push([x, y]);
        }
    }
    while (pontos.length > MAX_PARTICULAS) pontos.splice(Math.floor(Math.random() * pontos.length), 1);
    return pontos;
}

function criarParticulas(texto, cores, largura, altura) {
    return pontosDoTexto(texto, largura, altura).map(([tx, ty]) => {
        const angulo = Math.random() * Math.PI * 2;
        return {
            tx,
            ty,
            // Começa como areia espalhada em volta do centro
            sx: largura / 2 + gaussiana() * largura * 0.22,
            sy: altura / 2 + gaussiana() * altura * 0.28,
            // Direção para onde a partícula foge quando o título se desfaz
            fx: Math.cos(angulo) * (150 + Math.random() * 350),
            fy: Math.sin(angulo) * (150 + Math.random() * 350),
            fase: Math.random() * Math.PI * 2,
            cor: cores[Math.floor(Math.random() * cores.length)],
            tamanho: Math.random() < 0.2 ? 2.2 : 1.5,
        };
    });
}

/*
 * Título escrito com grãos de areia, controlado pela rolagem:
 * os grãos saem espalhados, formam o texto e depois se espalham e somem.
 */
function ParticulasTitulo({ texto, cores, progresso }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let particulas = [];
        let largura = 0;
        let altura = 0;
        let quadro = 0;
        let visivel = false;

        const preparar = async () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            largura = canvas.clientWidth;
            altura = canvas.clientHeight;
            canvas.width = largura * dpr;
            canvas.height = altura * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // Sem esperar a fonte, o texto seria amostrado na fonte reserva
            await document.fonts.load('400 120px "DM Serif Display"').catch(() => {});
            particulas = criarParticulas(texto, cores, largura, altura);
        };

        const desenhar = (tempo) => {
            const p = progresso.get();
            const m = suavizar(limitar((p - MONTAR[0]) / (MONTAR[1] - MONTAR[0])));
            const d = suavizar(limitar((p - DESFAZER[0]) / (DESFAZER[1] - DESFAZER[0])));
            const t = tempo / 1000;

            ctx.clearRect(0, 0, largura, altura);
            ctx.globalAlpha = 1 - d;
            for (const q of particulas) {
                const tremor = (1 - m * 0.85) * 6;
                const x = q.sx + (q.tx - q.sx) * m + q.fx * d + Math.sin(t * 1.3 + q.fase) * tremor;
                const y = q.sy + (q.ty - q.sy) * m + q.fy * d + Math.cos(t * 1.1 + q.fase) * tremor;
                ctx.fillStyle = q.cor;
                ctx.fillRect(x, y, q.tamanho, q.tamanho);
            }
            if (visivel) quadro = requestAnimationFrame(desenhar);
        };

        // Só anima enquanto a seção está na tela
        const observador = new IntersectionObserver(([entrada]) => {
            visivel = entrada.isIntersecting;
            cancelAnimationFrame(quadro);
            if (visivel) quadro = requestAnimationFrame(desenhar);
        });

        let espera;
        const aoRedimensionar = () => {
            clearTimeout(espera);
            espera = setTimeout(preparar, 200);
        };

        preparar().then(() => observador.observe(canvas));
        window.addEventListener("resize", aoRedimensionar);
        return () => {
            visivel = false;
            cancelAnimationFrame(quadro);
            clearTimeout(espera);
            observador.disconnect();
            window.removeEventListener("resize", aoRedimensionar);
        };
    }, [texto, cores, progresso]);

    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export default ParticulasTitulo;
