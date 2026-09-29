import WhiteArrow from '../../assets/Vector.svg';

const STYLES = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900',
    unstyled: 'bg-transparent p-0',
};

function Button({ arrow, buttonStyle = 'primary', loading, disabled, children, className = '', ...props }) {
    return (
        <button
            disabled={disabled || loading}
            className={`inline-flex items-center gap-2.5 rounded-full font-semibold text-base px-8 py-4 cursor-pointer transition-colors duration-300 disabled:bg-slate-300 disabled:text-slate-500 disabled:pointer-events-none ${STYLES[buttonStyle]} ${className}`}
            {...props}
        >
            {loading ? 'Carregando...' : children} {arrow && !loading && <img src={WhiteArrow} alt="" className={buttonStyle === 'outline' ? 'invert-0 dark:invert' : ''} />}
        </button>
    )
}

export default Button;
