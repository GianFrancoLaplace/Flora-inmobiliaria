import styles from "@/components/Forms/SalesForm/SalesForm.module.css";
import {cactus} from "@/app/ui/fonts";

export default function SalesForm() {
    return (
        <section className={styles.page}>
            <div className={styles.titleProperties}>
                <h2>Vende tu propiedad</h2>
                <h6>Completá el formulario con tus datos y nos contactaremos a la brevedad para continuar con el proceso</h6>
            </div>
            <div className={styles.loginContainer}>
                <form>
                    <div className={styles.fieldProperties}>
                    <label htmlFor="nickname">Nombre y apellido</label>
                        <input
                            type="text"
                            id="name"
                            name="name" required
                            placeholder="Nombre y apellido"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.fieldProperties}>
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="text"
                            id="tel"
                            name="tel" required
                            placeholder="Teléfono"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.fieldProperties}>
                        <label htmlFor="mail">E-mail</label>
                        <input
                            type="text"
                            id="email"
                            name="email" required
                            placeholder="E-mail"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.fieldProperties}>
                        <label htmlFor="type">Tipo de propiedad</label>
                        <input
                            type="text"
                            id="propType"
                            name="propType" required
                            placeholder="Tipo de propiedad"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.fieldProperties}>
                        <label htmlFor="coments">Comentarios</label>
                        <input
                            type="text"
                            id="coment"
                            name="coment" required
                            placeholder="Comentarios"
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={`${styles.loginBtn} ${cactus.className}`}>Enviar propuesta</button>
                </form>
            </div>
        </section>
    )
}