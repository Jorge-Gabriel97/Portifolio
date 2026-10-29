import Header from "../componets/Header/Header";
import Banner from "../componets/Banner/Banner";
import ContactForm from "../componets/ContactForm/ContactForm";
import Footer from "../componets/Footer/Footer";
import Abertura from "../componets/Kit/Abertura";
import { NAV_CONTATO } from "../dados/navegacao";

function Contact() {
    return (
        <>
            <Header />
            <Abertura nav={NAV_CONTATO}>
                <Banner title="Contato" subtitle="Vaga, projeto ou uma conversa sobre tecnologia." />
            </Abertura>
            <main className="flex-1">
                <ContactForm />
            </main>
            <Footer />
        </>
    )
}

export default Contact
