import "./ContactForm.css";

function ContactForm() {
    return (
        <div className="container">
            <div className="contact-form d-flex fd-column al-center">
                
                {/* O nosso Card de Chamada para Ação (CTA) */}
                <div className="cta-box">
                    <h2>Gostou do que viu?</h2>
                    <p>Vamos construir algo incrível juntos. Preencha o formulário abaixo ou, se preferir, me mande um e-mail direto.</p>
                    
                    {/* Estrutura do Formulário */}
                    <form className="form-container">
                        <input 
                            type="text" 
                            placeholder="Seu Nome" 
                            className="form-input" 
                            required 
                        />
                        <input 
                            type="email" 
                            placeholder="Seu E-mail" 
                            className="form-input" 
                            required 
                        />
                        <textarea 
                            placeholder="Como posso te ajudar?" 
                            className="form-textarea" 
                            rows="5" 
                            required
                        ></textarea>
                        
                        <button type="submit" className="cta-button">
                            Enviar Mensagem ➔
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ContactForm;