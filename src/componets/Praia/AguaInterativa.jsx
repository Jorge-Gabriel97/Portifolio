import { useEffect, useRef } from "react";

/*
 * Superfície do mar em canvas: linhas de brilho que balançam, mais fortes embaixo do sol (o reflexo),
 * e ondulações circulares que se abrem onde o mouse (ou o dedo) passa sobre a água.
 * O reflexo acompanha a posição real do sol e some conforme ele se põe ("progresso" de 0 a 1).
 */
const LINHAS = 16;
const PASSO = 9;
const MAX_ONDULACOES = 24;

function AguaInterativa({ progresso, solRef, alvoRef, animar }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const alvo = alvoRef.current;
        let largura = 0;
        let altura = 0;
        let quadro = 0;
        let visivel = false;
        let ondulacoes = [];
        let ultimo = { x: -999, y: -999 };

        const medir = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            largura = canvas.clientWidth;
            altura = canvas.clientHeight;
            canvas.width = largura * dpr;
            canvas.height = altura * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        // Soma das ondulações ativas num ponto: anel que se expande e perde força com o tempo e a distância
        const deslocamento = (x, y, agora) => {
            let total = 0;
            for (const o of ondulacoes) {
                const idade = (agora - o.inicio) / 1000;
                const d = Math.hypot(x - o.x, (y - o.y) * 2.2);
                const frente = idade * 170;
                if (d > frente + 30) continue;
                total += 9 * Math.exp(-idade * 1.4) * Math.exp(-Math.abs(d - frente) / 26) * Math.sin(d * 0.09 - idade * 7);
            }
            return total;
        };

        const desenhar = (agora) => {
            const p = progresso.get();
            const t = agora / 1000;
            ondulacoes = ondulacoes.filter((o) => agora - o.inicio < 2600);

            // Centro do sol, em coordenadas do canvas, para o reflexo cair embaixo dele
            const caixa = canvas.getBoundingClientRect();
            const sol = solRef.current?.getBoundingClientRect();
            const solX = sol ? sol.left + sol.width / 2 - caixa.left : largura * 0.75;
            const forcaReflexo = Math.max(0, 1 - p * 2);

            ctx.clearRect(0, 0, largura, altura);
            ctx.lineWidth = 1.2;
            for (let i = 0; i < LINHAS; i++) {
                // Linhas mais juntas perto do horizonte: dá a sensação de profundidade
                const f = i / (LINHAS - 1);
                const base = 4 + Math.pow(f, 1.5) * (altura - 8);
                const amplitude = 0.4 + f * 2.2;
                const abertura = 30 + f * 120;
                for (let x = 0; x < largura; x += PASSO) {
                    const y = base + Math.sin(x * 0.018 * (1 + i * 0.07) + t * (0.6 + f * 0.6) + i) * amplitude;
                    const dy = deslocamento(x, base, agora);
                    const reflexo = Math.exp(-(((x - solX) / abertura) ** 2)) * forcaReflexo;
                    const alfa = 0.04 + f * 0.05 + reflexo * 0.6 + Math.min(0.5, Math.abs(dy) * 0.09);
                    ctx.strokeStyle = reflexo > 0.05 ? `rgba(251, 211, 141, ${alfa})` : `rgba(255, 255, 255, ${alfa})`;
                    ctx.beginPath();
                    ctx.moveTo(x, y + dy);
                    ctx.lineTo(x + PASSO * 0.9, y + dy + Math.sin((x + PASSO) * 0.05 + t) * 0.3);
                    ctx.stroke();
                }
            }
            if (visivel && animar) quadro = requestAnimationFrame(desenhar);
        };

        const aoMover = (e) => {
            const caixa = canvas.getBoundingClientRect();
            const x = e.clientX - caixa.left;
            const y = e.clientY - caixa.top;
            // Só faz ondulação sobre a água e espaçando os toques, para não virar um borrão
            if (y < -10 || y > altura + 10 || Math.hypot(x - ultimo.x, y - ultimo.y) < 38) return;
            ultimo = { x, y };
            ondulacoes.push({ x, y, inicio: performance.now() });
            if (ondulacoes.length > MAX_ONDULACOES) ondulacoes.shift();
        };

        const observador = new IntersectionObserver(([entrada]) => {
            visivel = entrada.isIntersecting;
            cancelAnimationFrame(quadro);
            if (visivel) quadro = requestAnimationFrame(desenhar);
        });

        medir();
        observador.observe(canvas);
        window.addEventListener("resize", medir);
        if (animar) alvo?.addEventListener("pointermove", aoMover);
        // Sem animação ("reduzir movimento"), desenha uma vez e deixa parado
        if (!animar) requestAnimationFrame(desenhar);

        return () => {
            visivel = false;
            cancelAnimationFrame(quadro);
            observador.disconnect();
            window.removeEventListener("resize", medir);
            alvo?.removeEventListener("pointermove", aoMover);
        };
    }, [progresso, solRef, alvoRef, animar]);

    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export default AguaInterativa;
