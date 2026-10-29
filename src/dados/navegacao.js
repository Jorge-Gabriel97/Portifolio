/*
 * ✏️ NAVEGAÇÃO (menu lateral e barra de progresso de cada página)
 * Cada página lista as próprias seções; o menu completa com as outras páginas do site.
 * As cores vão da areia ao mar profundo, na ordem em que a página "desce".
 * Contraste do texto conferido (>= 4.5:1) em todos os blocos, nos dois temas.
 */
const BLOCOS = [
    "bg-[#E7D8C6] text-oceano dark:bg-[#2C4F73] dark:text-areia",
    "bg-[#D3E8E3] text-oceano dark:bg-[#24566A] dark:text-areia",
    "bg-[#AFD5CE] text-oceano dark:bg-[#1F5C66] dark:text-areia",
    "bg-[#8CC3BC] text-oceano dark:bg-[#1A5560] dark:text-areia",
    "bg-[#2A6F78] text-areia dark:bg-[#154459]",
    "bg-[#17405F] text-areia dark:bg-[#10334D]",
    "bg-[#0B1E35] text-areia dark:bg-[#0A2238]",
];

// Cores da barra de progresso: fortes o bastante para aparecer sobre a areia
const TRECHOS = ["#C9A97E", "#5FA3A0", "#2A6F78", "#17405F"];

const PAGINAS = [
    { to: "/", nome: "Início", descricao: "Quem sou e o que eu faço" },
    { to: "/about", nome: "Sobre mim", descricao: "História, formação e método" },
    { to: "/projects", nome: "Todos os projetos", descricao: "Todo o código aberto no GitHub" },
    { to: "/contact", nome: "Contato", descricao: "Vaga, projeto ou uma conversa" },
];

const numero = (i) => String(i).padStart(2, "0");

// A primeira seção é o topo da página (id "inicio"); as seguintes ganham número
function montar(secoes, rotaAtual) {
    const comNumero = secoes.map((s, i) => (i === 0 ? s : { ...s, numero: numero(i) }));
    const itens = [...comNumero, ...PAGINAS.filter((p) => p.to !== rotaAtual)];
    // Espalha a escala de cores pelos itens, para toda página ir da areia ao fundo
    const corDoItem = (i) => BLOCOS[Math.round((i * (BLOCOS.length - 1)) / (itens.length - 1))];
    return {
        menu: itens.map((item, i) => ({ ...item, bloco: corDoItem(i) })),
        barra: comNumero.map((s, i) => ({ ...s, cor: TRECHOS[Math.min(i, TRECHOS.length - 1)] })),
    };
}

export const NAV_INICIO = montar(
    [
        { id: "inicio", nome: "Início", descricao: "Quem sou e o que eu faço" },
        { id: "tecnologia", nome: "Tecnologia", descricao: "Um mergulho pela minha stack" },
        { id: "trajetoria", nome: "Trajetória", descricao: "Do suporte técnico às redes" },
        { id: "projetos", nome: "Projetos", descricao: "O que eu já construí" },
    ],
    "/",
);

export const NAV_SOBRE = montar(
    [
        { id: "inicio", nome: "Sobre mim", descricao: "Do suporte ao Full Stack" },
        { id: "quem-sou", nome: "Quem eu sou", descricao: "História e formação" },
        { id: "como-trabalho", nome: "Como eu trabalho", descricao: "Follow the Data Flow em 3 passos" },
    ],
    "/about",
);

export const NAV_PROJETOS = montar(
    [
        { id: "inicio", nome: "Projetos", descricao: "Código aberto no GitHub" },
        { id: "destaque", nome: "Em destaque", descricao: "O case principal, do problema à solução" },
        { id: "repositorios", nome: "Repositórios", descricao: "Todos os outros projetos" },
    ],
    "/projects",
);

export const NAV_CONTATO = montar(
    [
        { id: "inicio", nome: "Contato", descricao: "Vamos conversar" },
        { id: "mensagem", nome: "Mensagem", descricao: "Escreva e eu respondo por e-mail" },
    ],
    "/contact",
);
