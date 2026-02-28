import Banner from "../componets/Banner/Banner";
import Button from "../componets/Button/Button";
import Header from "../componets/Header/Header";
import Footer from "../componets/Footer/Footer";

function Home() {
    return (
        <>            
            <Header /> 
            
            <h1>Inicio</h1>
            <p>Subtitle</p>
            <Button buttonStyle="primary" >Olá!</Button>
            <Banner title="Home" image="About.png" />  
            <Footer />
        </>
    )
}

export default Home;