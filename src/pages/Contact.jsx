import Header from "../componets/Header/Header";
import ContactForm from "../componets/ContactForm/ContactForm";
import Banner from "../componets/Banner/Banner";
import Footer from "../componets/Footer/Footer";

function Contact() {
    return (
        <>
            <Header />
            <Banner title="Contato" subtitle="Vaga, projeto ou uma conversa sobre tecnologia." />
            <main className="flex-1">
                <ContactForm />
            </main>
            <Footer />
        </>
    )
}

export default Contact
