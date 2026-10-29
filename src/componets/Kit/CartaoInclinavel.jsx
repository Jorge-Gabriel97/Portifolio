import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/*
 * Cartão que se inclina em 3D na direção do mouse, com um brilho que segue o cursor
 * (como luz batendo num vidro). Só reage a mouse: no toque o cartão fica parado.
 * Props: intensidade (graus máximos de inclinação), className e children.
 */
const MotionDiv = motion.div;
const MOLA = { stiffness: 220, damping: 22, mass: 0.6 };

function CartaoInclinavel({ intensidade = 9, className = "", children }) {
    const reduzirMovimento = useReducedMotion();
    const rotX = useSpring(0, MOLA);
    const rotY = useSpring(0, MOLA);
    const luzX = useMotionValue(50);
    const luzY = useMotionValue(50);
    const luz = useSpring(0, MOLA);
    const brilho = useMotionTemplate`radial-gradient(circle at ${luzX}% ${luzY}%, rgba(255, 255, 255, 0.45), transparent 55%)`;

    if (reduzirMovimento) return <div className={`relative ${className}`}>{children}</div>;

    const aoMover = (e) => {
        if (e.pointerType !== "mouse") return;
        const caixa = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - caixa.left) / caixa.width;
        const y = (e.clientY - caixa.top) / caixa.height;
        rotY.set((x - 0.5) * 2 * intensidade);
        rotX.set(-(y - 0.5) * 2 * intensidade * 0.8);
        luzX.set(x * 100);
        luzY.set(y * 100);
        luz.set(1);
    };

    const aoSair = () => {
        rotX.set(0);
        rotY.set(0);
        luz.set(0);
    };

    return (
        <div className="h-full [perspective:900px]">
            <MotionDiv
                onPointerMove={aoMover}
                onPointerLeave={aoSair}
                style={{ rotateX: rotX, rotateY: rotY }}
                className={`relative h-full will-change-transform ${className}`}
            >
                {children}
                <MotionDiv
                    style={{ backgroundImage: brilho, opacity: luz }}
                    className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
                    aria-hidden="true"
                />
            </MotionDiv>
        </div>
    );
}

export default CartaoInclinavel;
