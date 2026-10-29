import Header from "../componets/Header/Header";
import Banner from "../componets/Banner/Banner";
import AboutDescription from "../componets/AboutDescripition/AboutDescription";
import Methodology from "../componets/Methodology/Methodology";
import Footer from "../componets/Footer/Footer";
import Abertura from "../componets/Kit/Abertura";
import { NAV_SOBRE } from "../dados/navegacao";

function About() {
    return (
        <>
            <Header />
            <Abertura nav={NAV_SOBRE}>
                <Banner title="Sobre mim" subtitle="Do suporte técnico e das redes ao desenvolvimento Full Stack." />
            </Abertura>
            <main className="container flex-1">
                <AboutDescription />
                <Methodology />
            </main>
            <Footer />
        </>
    )
}

export default About
