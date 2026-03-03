import { useState } from "react";
import "./ContactForm.css";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    // 1. Follow the Data Flow: Calculamos a validação direto no fluxo, sem precisar de useEffect!
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

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
        e.preventDefault(); // Impede a página de recarregar
        if (isFormValid) {
            setFormData({ name: "", email: "", message: "" });
        }
    };

    return (
        <div className="container">
            <div className="contact-form d-flex fd-column al-center">

                <div className="cta-box">
                    <h2>Gostou do que viu?</h2>
                    <p>Vamos construir algo incrível juntos. Preencha o formulário abaixo ou, se preferir, me mande um e-mail direto.</p>


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
                            disabled={!isFormValid}
                            style={{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed' }}                        >
                            Enviar Mensagem ➔
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;