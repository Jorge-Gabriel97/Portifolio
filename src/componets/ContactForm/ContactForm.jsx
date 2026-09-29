import { useState } from "react";
import Reveal from "../../Utils/Reveal";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

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

    const inputClasses = "w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-slate-800 transition-colors duration-300 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20";

    return (
        <div className="container py-20 md:py-28">
            <Reveal className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-800/50 md:p-14">
                <h2 className="font-serif text-3xl text-slate-900 dark:text-white md:text-4xl">
                    Vamos conversar sobre o seu projeto?
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                    Conta o que precisa construir — eu respondo com os próximos passos.
                </p>
                <form className="mt-10 flex w-full flex-col gap-5" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Seu nome"
                        className={inputClasses}
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Seu e-mail"
                        className={inputClasses}
                        required
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        placeholder="Como posso te ajudar?"
                        className={`${inputClasses} resize-y`}
                        rows="5"
                        required
                        onChange={handleChange}
                    ></textarea>

                    <button
                        type="submit"
                        disabled={!isFormValid || formSubmitLoading}
                        className="mt-2 cursor-pointer rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
                    >
                        {formSubmitLoading ? "Enviando..." : "Enviar mensagem ➔"}
                    </button>
                </form>
                {formSubmitted && (
                    <p className="mt-4 font-medium text-emerald-600 dark:text-emerald-400">
                        Obrigado! Entrarei em contato em breve.
                    </p>
                )}
            </Reveal>
        </div>
    );
}

export default ContactForm;
