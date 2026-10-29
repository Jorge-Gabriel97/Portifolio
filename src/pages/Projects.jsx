import Header from "../componets/Header/Header";
import Banner from "../componets/Banner/Banner";
import ProjetcsList from "../componets/ProjetcsList/ProjetcsList";
import Footer from "../componets/Footer/Footer";
import Abertura from "../componets/Kit/Abertura";
import { NAV_PROJETOS } from "../dados/navegacao";

function Projects() {
    return (
        <>
            <Header />
            <Abertura nav={NAV_PROJETOS}>
                <Banner title="Projetos" subtitle="Todos com o código aberto no GitHub." />
            </Abertura>
            <main className="container flex-1">
                <ProjetcsList />
            </main>
            <Footer />
        </>
    )
}

export default Projects
