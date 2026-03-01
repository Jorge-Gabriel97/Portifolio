import Header from "../componets/Header/Header";
import Hero from "../componets/Hero/Hero";
import Footer from "../componets/Footer/Footer";
import ProjetcsList from "../componets/ProjetcsList/ProjetcsList";

function Home() {
    return (
        <>
            <Header />            
            
            <div className="container">
                <Hero />
                <ProjetcsList />
            </div>
            <Footer />
        </>
    )
}

export default Home;