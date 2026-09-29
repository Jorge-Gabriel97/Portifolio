import Header from "../componets/Header/Header";
import Banner from "../componets/Banner/Banner";
import AboutDescription from "../componets/AboutDescripition/AboutDescription";
import Methodology from "../componets/Methodology/Methodology";
import Footer from "../componets/Footer/Footer";

function About() {
    return (
        <>
            <Header />
            <Banner title="Sobre mim" image="About.png" />
            <div className="container">
                <AboutDescription />
                <Methodology />
            </div>
            <Footer />
        </>
    )
}

export default About
