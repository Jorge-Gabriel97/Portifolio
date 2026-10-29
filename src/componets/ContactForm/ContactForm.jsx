import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../../Utils/Reveal";
import TextoRevelado from "../Kit/TextoRevelado";
import MensagemNaGarrafa from "./MensagemNaGarrafa";

const MotionForm = motion.form;

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [erroEnvio, setErroEnvio] = useState("");

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
            setErroEnvio("");
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
                    setErroEnvio("Não consegui enviar agora. Tente de novo em instantes ou me escreva direto pelo e-mail do rodapé.");
                }
            }
            catch {
                setErroEnvio("Sem conexão com o servidor. Confira sua internet e tente de novo, ou me escreva pelo e-mail do rodapé.");
            }
            finally {
                setFormSubmitLoading(false);
            }
        }
    };

    const inputClasses = "w-full rounded-2xl border border-areia-escura bg-white px-4 py-4 text-oceano transition-colors duration-300 placeholder:text-[#5A6B82] focus:border-mar focus:outline-none focus:ring-2 focus:ring-mar/30 dark:border-white/15 dark:bg-oceano-fundo dark:text-white dark:placeholder:text-slate-400 dark:focus:border-[#4FD1C5]";

    return (
        <div id="mensagem" className="container scroll-mt-20 py-20 md:py-28">
            <Reveal className="mx-auto flex max-w-2xl flex-col items-center cartao p-8 text-center shadow-sm md:p-14">
                <TextoRevelado texto="Vamos conversar?" className="font-serif text-3xl md:text-4xl" />
                <p className="mt-4 text-lg text-oceano/80 dark:text-slate-300">
                    Vaga, projeto freelance ou dúvida sobre algum repositório: me escreva e eu respondo por e-mail.
                </p>
                {/* Ao enviar, o formulário encolhe e "entra na garrafa", que cai no mar */}
                <AnimatePresence mode="wait" initial={false}>
                {formSubmitted ? (
                    <MensagemNaGarrafa key="garrafa" aoEscreverOutra={() => setFormSubmitted(false)} />
                ) : (
                <MotionForm
                    key="formulario"
                    className="mt-10 flex w-full flex-col gap-5"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0, scale: 0.2, y: 120, rotate: -10, transition: { duration: 0.45, ease: [0.5, 0, 0.75, 0] } }}
                >
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Seu nome"
                        aria-label="Seu nome"
                        className={inputClasses}
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Seu e-mail"
                        aria-label="Seu e-mail"
                        className={inputClasses}
                        required
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        placeholder="Como posso te ajudar?"
                        aria-label="Como posso te ajudar?"
                        className={`${inputClasses} resize-y`}
                        rows="5"
                        required
                        onChange={handleChange}
                    ></textarea>

                    <button
                        type="submit"
                        disabled={!isFormValid || formSubmitLoading}
                        className="mt-2 cursor-pointer rounded-full bg-coral px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9C4221] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mar disabled:pointer-events-none disabled:opacity-60"
                    >
                        {formSubmitLoading ? "Enviando..." : "Enviar mensagem ➔"}
                    </button>
                    {erroEnvio && (
                        <p role="alert" className="font-medium text-coral dark:text-[#FBD38D]">
                            {erroEnvio}
                        </p>
                    )}
                </MotionForm>
                )}
                </AnimatePresence>
            </Reveal>
        </div>
    );
}

export default ContactForm;
