"use client";

import styles from "./SalesForm.module.css";
import { cactus } from "@/app/(views)/ui/fonts";
import { useState, type FormEvent } from "react";

export default function SalesForm() {
    // Estado para guardar los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        tel: '',
        email: '',
        propType: '',
        coment: ''
    });

    // Estado para manejar el proceso de envío
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    // Función para actualizar el estado cuando el usuario escribe
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // PFunción para manejar el envío del formulario
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // Previene la recarga de la página
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('¡Propuesta enviada con éxito! Nos pondremos en contacto pronto.');
                setFormData({ name: '', tel: '', email: '', propType: '', coment: '' });
            } else {
                setMessage(`Error al enviar: ${result.error || 'Inténtelo de nuevo más tarde.'}`);
            }
        } catch (Error) {
            setMessage('Ocurrió un error de red. Por favor, revise su conexión.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={styles.page}>
            <div className={styles.titleProperties}>
                <h1>Vendé tu propiedad</h1>
                <h4>Completá el formulario con tus datos y nos contactaremos a la brevedad para continuar con el proceso</h4>
            </div>
            <div className={styles.loginContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.fieldProperties}>
                        <label htmlFor="name">Nombre y apellido</label>
                        <input
                            type="text" id="name" name="name" required
                            placeholder="Nombre y apellido" className={styles.input}
                            value={formData.name} onChange={handleChange}
                        />
                    </div>
                    <div className={styles.fieldProperties}>
                        <label htmlFor="tel">Teléfono</label>
                        <input
                            type="text" id="tel" name="tel" required
                            placeholder="Teléfono" className={styles.input}
                            value={formData.tel} onChange={handleChange}
                        />
                    </div>
                    <div className={styles.fieldProperties}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email" id="email" name="email" required
                            placeholder="E-mail" className={styles.input}
                            value={formData.email} onChange={handleChange}
                        />
                    </div>
                    <div className={styles.fieldProperties}>
                        <label htmlFor="propType">Tipo de propiedad</label>
                        <input
                            type="text" id="propType" name="propType" required
                            placeholder="Tipo de propiedad" className={styles.input}
                            value={formData.propType} onChange={handleChange}
                        />
                    </div>
                    <div className={styles.fieldProperties}>
                        <label htmlFor="coment">Comentarios</label>
                        <input
                            type="text" id="coment" name="coment" required
                            placeholder="Comentarios" className={styles.input}
                            value={formData.coment} onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={`${styles.loginBtn} ${cactus.className}`} disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar propuesta'}
                    </button>
                    {/* Mensaje de feedback para el usuario */}
                    {message && <p className={styles.feedbackMessage}>{message}</p>}
                </form>
            </div>
        </section>
    );
}