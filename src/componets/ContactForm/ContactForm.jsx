import { useState } from "react";
import "./ContactForm.css";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    // Removido o useState do isFormValid, pois ele é calculado abaixo
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // "Follow the Data Flow": Validação calculada a cada renderização
    const isFormValid =
        formData.name.trim() !== "" &&
        isValidEmail(formData.email) &&
        formData.message.trim() !== "";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid) {
            setFormSubmitLoading(true);
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...formData,
                        access_key: '842457cc-9b94-42a5-8f25-cc3583e36c83'
                    })
                });
                
                if (response.ok) {
                    setFormSubmitted(true);
                    setFormData({ name: "", email: "", message: "" });
                    alert("Mensagem enviada com sucesso!");
                } else {
                    alert('Erro ao enviar formulário: ' + response.statusText);
                }
            }
            catch (error) {
                alert("Erro ao enviar formulário: " + error.message);
            }
            finally {
                setFormSubmitLoading(false);
            }
        }
    };

    return (
        <div className="container">
            <div className="contact-form d-flex fd-column al-center">
                <div className="cta-box">
                    <h2>Gostou do que viu?</h2>
                    <p>Vamos construir algo incrível juntos.</p>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Seu Nome"
                            className="form-input"
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Seu E-mail"
                            className="form-input"
                            required
                            onChange={handleChange}
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            placeholder="Como posso te ajudar?"
                            className="form-textarea"
                            rows="5"
                            required
                            onChange={handleChange}
                        ></textarea>

                        <button
                            type="submit"
                            className="cta-button"
                            disabled={!isFormValid || formSubmitLoading}
                            style={{ 
                                opacity: isFormValid ? 1 : 0.5, 
                                cursor: isFormValid ? 'pointer' : 'not-allowed' 
                            }}
                        >
                            {formSubmitLoading ? "Enviando..." : "Enviar Mensagem ➔"}
                        </button>
                    </form>
                    {formSubmitted && <p style={{color: 'green', marginTop: '10px'}}>Obrigado! Entrarei em contato em breve.</p>}
                </div>
            </div>
        </div>
    );
}

export default ContactForm;