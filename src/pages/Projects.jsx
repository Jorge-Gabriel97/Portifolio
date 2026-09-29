import Header from "../componets/Header/Header";
import Banner from "../componets/Banner/Banner";
import ProjetcsList from "../componets/ProjetcsList/ProjetcsList";
import Footer from "../componets/Footer/Footer";

function Projects() {
    return (
        <>
            <Header />
            <Banner title="Projetos" subtitle="Todos com o código aberto no GitHub." />
            <main className="container flex-1">
                <ProjetcsList />
            </main>
            <Footer />
        </>
    )
}

export default Projects
