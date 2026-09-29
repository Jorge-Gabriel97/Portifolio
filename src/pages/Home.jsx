import Header from "../componets/Header/Header";
import Hero from "../componets/Hero/Hero";
import Habilidades from "../componets/Habilidades/Habilidades";
import Trajetoria from "../componets/Trajetoria/Trajetoria";
import Footer from "../componets/Footer/Footer";
import ProjetcsList from "../componets/ProjetcsList/ProjetcsList";

function Home() {
    return (
        <>
            <Header />
            <main className="container flex-1 pt-10">
                <Hero />
                <Habilidades />
                <Trajetoria />
                <ProjetcsList />
            </main>
            <Footer />
        </>
    )
}

export default Home;
