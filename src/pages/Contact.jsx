import Header from "../componets/Header/Header";
import ContactForm from "../componets/ContactForm/ContactForm";
import Banner from "../componets/Banner/Banner";
import Footer from "../componets/Footer/Footer";

function Contact() {
    return (
        <>
            <Header />
            <Banner title="Contato" image="Contacts.png" />
            <ContactForm />
            <Footer />
        </>
    )
}


export default Contact