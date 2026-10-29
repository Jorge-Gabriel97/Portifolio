// Linguagens do GitHub agrupadas para o filtro: HTML e CSS viram um grupo só e notebooks contam como Python
export const TODOS = "Todos";

const GRUPOS = {
    HTML: "HTML & CSS",
    CSS: "HTML & CSS",
    "Jupyter Notebook": "Python",
};

export const grupoDoRepo = (repo) => (repo.language ? GRUPOS[repo.language] ?? repo.language : null);

// Grupos com quantidade, do mais usado ao menos usado
export function montarFiltros(repos) {
    const contagem = new Map();
    repos.forEach((repo) => {
        const grupo = grupoDoRepo(repo);
        if (grupo) contagem.set(grupo, (contagem.get(grupo) ?? 0) + 1);
    });
    const grupos = [...contagem].sort((a, b) => b[1] - a[1]).map(([nome, total]) => ({ nome, total }));
    return [{ nome: TODOS, total: repos.length }, ...grupos];
}
