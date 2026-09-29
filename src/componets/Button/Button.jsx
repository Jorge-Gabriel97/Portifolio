import WhiteArrow from '../../assets/Vector.svg';

// Cores do tema praia (ver main.css). Todas com contraste >= 4.5:1 para o texto.
const STYLES = {
    primary: 'bg-coral text-white hover:bg-[#9C4221]',
    secondary: 'bg-oceano text-white hover:bg-[#2C5282] dark:bg-areia dark:text-oceano dark:hover:bg-white',
    outline: 'bg-transparent border-2 border-oceano text-oceano hover:bg-oceano hover:text-white dark:border-areia dark:text-areia dark:hover:bg-areia dark:hover:text-oceano',
    unstyled: 'bg-transparent p-0',
};

// A seta é um SVG branco: nos estilos com texto escuro ela é invertida para ficar visível
const SETA = {
    primary: '',
    secondary: 'dark:invert',
    outline: 'invert dark:invert-0',
    unstyled: '',
};

function Button({ arrow, buttonStyle = 'primary', loading, disabled, children, className = '', ...props }) {
    return (
        <button
            disabled={disabled || loading}
            className={`inline-flex items-center gap-2.5 rounded-full font-semibold text-base px-8 py-4 cursor-pointer transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mar disabled:bg-slate-300 disabled:text-slate-600 disabled:pointer-events-none ${STYLES[buttonStyle]} ${className}`}
            {...props}
        >
            {loading ? 'Carregando...' : children} {arrow && !loading && <img src={WhiteArrow} alt="" className={SETA[buttonStyle]} />}
        </button>
    )
}

export default Button;
