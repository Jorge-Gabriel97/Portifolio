import Header from "../componets/Header/Header";
import Banner from "../componets/Banner/Banner";
import ProjetcsList from "../componets/ProjetcsList/ProjetcsList";
import Footer from "../componets/Footer/Footer";


function Projects() {
    return (
        <>
            <Header />   
            <Banner title="Projetos" image="Projects.png" />     
            <div className="container">                
            <ProjetcsList />
            </div>
            <Footer />
        </>
    )
}

export default Projects