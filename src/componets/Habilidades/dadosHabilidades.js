/*
 * ✏️ DADOS DAS HABILIDADES
 *
 * Cada habilidade só entra aqui se houver um projeto no GitHub que a comprove.
 * "projetos" são nomes de repositórios de github.com/Jorge-Gabriel97, e viram links.
 * O que ainda está em estudo vai no grupo "Estudando agora", sem projetos.
 */

export const GITHUB = "https://github.com/Jorge-Gabriel97";

export const GRUPOS = [
    {
        id: "front",
        titulo: "Front-end",
        habilidades: [
            {
                nome: "React",
                detalhe: "Componentes, hooks, Context API e rotas.",
                projetos: ["descontosBlackfriday", "Project-Kanban", "FinanceFlow", "MonitoringSystem"],
            },
            {
                nome: "TypeScript",
                detalhe: "Tipagem de componentes, dados da API e validação.",
                projetos: ["descontosBlackfriday", "Project-Kanban", "To-Do-List-Typescript", "TesteTecnico"],
            },
            {
                nome: "JavaScript",
                detalhe: "Manipulação do DOM, consumo de APIs e localStorage.",
                projetos: ["Weatherforecast", "FinanceFlow", "To-Do-List", "ChatFuria"],
            },
            {
                nome: "HTML e CSS",
                detalhe: "Layouts responsivos com Flexbox e Grid.",
                projetos: ["DevClub-Store", "DevClub-Coffe", "Calculo-IMC"],
            },
            {
                nome: "Tailwind CSS",
                detalhe: "Este portfólio, com tema próprio e modo escuro.",
                projetos: ["Portifolio"],
            },
        ],
    },
    {
        id: "back",
        titulo: "Back-end",
        habilidades: [
            {
                nome: "Java",
                detalhe: "APIs e sistemas web organizados em camadas.",
                projetos: ["descontosBlackfriday", "ControllerEstoque", "MonitoringSystem", "Barber-Maneger"],
            },
            {
                nome: "Spring Boot",
                detalhe: "APIs REST com Spring Data JPA, validação e tarefas agendadas.",
                projetos: ["descontosBlackfriday", "ControllerEstoque", "API-Users", "aprendendo-spring"],
            },
            {
                nome: "Spring Security",
                detalhe: "Login por sessão com CSRF, e autenticação com JWT.",
                projetos: ["descontosBlackfriday", "ControllerEstoque", "aprendendo-spring"],
            },
            {
                nome: "Python",
                detalhe: "Automação (RPA) e análise de dados com pandas.",
                projetos: ["RegistrationAutomation", "customer-churn-analysis", "TeamManager"],
            },
        ],
    },
    {
        id: "dados",
        titulo: "Dados",
        habilidades: [
            { nome: "PostgreSQL", detalhe: "Persistência com JPA.", projetos: ["aprendendo-spring"] },
            { nome: "MySQL", detalhe: "Banco do sistema de estoque.", projetos: ["ControllerEstoque"] },
            { nome: "MongoDB", detalhe: "API REST com Spring Data MongoDB.", projetos: ["API-Users"] },
            { nome: "H2", detalhe: "Banco embutido para desenvolvimento e testes.", projetos: ["descontosBlackfriday", "Barber-Maneger"] },
        ],
    },
    {
        id: "qualidade",
        titulo: "Qualidade e ferramentas",
        habilidades: [
            { nome: "JUnit e Mockito", detalhe: "Testes de regra de negócio e de API.", projetos: ["descontosBlackfriday"] },
            { nome: "Vitest", detalhe: "Testes de componentes React.", projetos: ["Project-Kanban"] },
            { nome: "Git e GitHub Actions", detalhe: "Versionamento e pipeline de CI.", projetos: ["aprendendo-spring"] },
        ],
    },
];

// Em estudo: aparece separado, com selo "estudando", sem prometer experiência.
export const ESTUDANDO = [
    { nome: "Node.js", detalhe: "Estudando para criar APIs em JavaScript." },
    { nome: "Docker", detalhe: "Estudando para empacotar e publicar meus projetos." },
];
