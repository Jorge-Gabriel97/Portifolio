import Header from "../componets/Header/Header";
import Hero from "../componets/Hero/Hero";
import Pillars from "../componets/Pillars/Pillars";
import Footer from "../componets/Footer/Footer";
import ProjetcsList from "../componets/ProjetcsList/ProjetcsList";

function Home() {
    return (
        <>
            <Header />
            <div className="container pt-10">
                <Hero />
                <Pillars />
                <ProjetcsList />
            </div>
            <Footer />
        </>
    )
}

export default Home;
