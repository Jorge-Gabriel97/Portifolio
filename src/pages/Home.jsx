import Button from "../componets/Button/Button";
import Header from "../componets/Header/Header";
import Footer from "../componets/Footer/Footer";

function Home() {
    return (
        <>            
            <Header /> 
            
            <h1>Home</h1>
            <p>Subtitle</p>
            <Button buttonStyle="primary" >Olá!</Button>
            <Footer />
        </>
    )
}

export default Home;