import { motion, useReducedMotion } from 'framer-motion';

// Faz o conteúdo surgir ao entrar na tela.
// Quem ativou "reduzir movimento" no sistema vê o conteúdo direto, sem animação.
function Reveal({ children, delay = 0, className = '', as = 'div' }) {
    const reduzirMovimento = useReducedMotion();
    const MotionTag = motion[as] ?? motion.div;
    return (
        <MotionTag
            initial={reduzirMovimento ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </MotionTag>
    );
}

export default Reveal;
