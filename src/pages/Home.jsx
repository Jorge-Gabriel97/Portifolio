import Header from "../componets/Header/Header";
import Hero from "../componets/Hero/Hero";
import Tecnologia from "../componets/Tecnologia/Tecnologia";
import Trajetoria from "../componets/Trajetoria/Trajetoria";
import Footer from "../componets/Footer/Footer";
import ProjetcsList from "../componets/ProjetcsList/ProjetcsList";
import Abertura from "../componets/Kit/Abertura";
import { NAV_INICIO } from "../dados/navegacao";

function Home() {
    return (
        <>
            <Header />
            {/* Tecnologia fica fora do container porque o fundo ocupa a tela toda */}
            <main className="flex-1">
                <div className="pb-20 md:pb-28">
                    <Abertura nav={NAV_INICIO}>
                        <Hero />
                    </Abertura>
                </div>
                <Tecnologia />
                <div className="container">
                    <Trajetoria />
                    <ProjetcsList />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Home;
