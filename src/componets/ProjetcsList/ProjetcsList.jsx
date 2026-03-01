import "./ProjetcsList.css";

//Assets
import LikeFilled from '../../assets/like-filled.svg'
import Like from '../../assets/like.svg'

function ProjetcsList(props) {
    return (
        <div className="projetcs-section" >            
            <div className="projetcs-hero">
                <h2>Conheça as soluções que desenvolvi</h2>
                <p>Explore uma coleção de projetos que demonstram minha experiência e habilidades em desenvolvimento web. Cada projeto é uma oportunidade para mostrar minha capacidade de criar soluções inovadoras e eficientes para desafios complexos. Desde aplicativos interativos até sistemas robustos, cada projeto reflete meu compromisso com a excelência e minha paixão por criar experiências digitais impactantes.</p>               
            </div>
            <div className="projetcs-grid">
                <div className="projetcs-card d-flex jc-center al-center fd-column">
                    <div className="thumb tertiary-background"></div>
                    <h3>Jorge Gabriel</h3>
                    <p>Ba, Brasil</p>
                    <img src={LikeFilled} height="20"/>                    
                </div>
                <div className="projetcs-card d-flex jc-center al-center fd-column">
                    <div className="thumb tertiary-background"></div>
                    <h3>Jorge Gabriel2</h3>
                    <p>Ba, Brasil</p>
                    <img src={LikeFilled} height="20" />                    
                </div>
                <div className="projetcs-card d-flex jc-center al-center fd-column">
                    <div className="thumb tertiary-background"></div>
                    <h3>Jorge Gabriel3</h3>
                    <p>Ba, Brasil</p>
                    <img src={LikeFilled} height="20" />                    
                </div>
                <div className="projetcs-card d-flex jc-center al-center fd-column">
                    <div className="thumb tertiary-background"></div>
                    <h3>Jorge Gabriel4</h3>
                    <p>Ba, Brasil</p>
                    <img src={LikeFilled} height="20" />                    
                </div>
                <div className="projetcs-card d-flex jc-center al-center fd-column">
                    <div className="thumb tertiary-background"></div>
                    <h3>Jorge Gabriel5</h3>
                    <p>Ba, Brasil</p>
                    <img src={LikeFilled} height="20" />                    
                </div>
                <div className="projetcs-card d-flex jc-center al-center fd-column">
                    <div className="thumb tertiary-background"></div>
                    <h3>Jorge Gabriel6</h3>
                    <p>Ba, Brasil</p>
                    <img src={LikeFilled} height="20" />                    
                </div>
                <div className="projetcs-card d-flex jc-center al-center fd-column">
                    <div className="thumb tertiary-background"></div>
                    <h3>Jorge Gabriel7</h3>
                    <p>Ba, Brasil</p>
                    <img src={LikeFilled} height="20" />                    
                </div>
                <div className="projetcs-card d-flex jc-center al-center fd-column">
                    <div className="thumb tertiary-background"></div>
                    <h3>Jorge Gabriel8</h3>
                    <p>Ba, Brasil</p>
                    <img src={LikeFilled} height="20" />                    
                </div>
            </div>
        </div>
    )
}

export default ProjetcsList;