import Header from "../componets/Header/Header";
import Hero from "../componets/Hero/Hero";
import Tecnologia from "../componets/Tecnologia/Tecnologia";
import Trajetoria from "../componets/Trajetoria/Trajetoria";
import Footer from "../componets/Footer/Footer";
import ProjetcsList from "../componets/ProjetcsList/ProjetcsList";

function Home() {
    return (
        <>
            <Header />
            {/* Tecnologia fica fora do container porque o fundo escuro ocupa a tela toda */}
            <main className="flex-1 pt-10">
                <div className="container pb-20 md:pb-28">
                    <Hero />
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
