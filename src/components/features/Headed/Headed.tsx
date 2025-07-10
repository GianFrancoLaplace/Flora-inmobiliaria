import styles from "@/components/TechnicalFile/TechnicalSheet.module.css";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useState} from "react";

export default function Headed(){
    const [modoEdicion, setModoEdicion] = useState(false);
    const [formulario, setFormulario] = useState({
        adress: 'Dirección',
        adressF: 'Av. Avellaneda 987',
    });
    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormulario(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const activarEdicion = (): void => setModoEdicion(true);
    const desactivarEdicion = (): void => setModoEdicion(false);
    const pathname = usePathname();
    const isEmptyFile = pathname === '/administracion/EmptySheet';
    const isEditableFile = pathname === '/administracion/EditableSheet'
    return(
            <div className={styles.mainAdressProperties}>
                <div className={`${styles.viewInfoAdress} ${isEmptyFile ? styles.notShowProperties : isEditableFile ? styles.notShowProperties : styles.showProperties}`}>
                    <h1>Av. Avellaneda 987</h1>
                    <Image
                        src={'/icons/share.png'}
                        alt={'Share Icon'}
                        width={30}
                        height={30}
                    />
                </div>
                <div className={`${isEmptyFile ? styles.editProperties : isEditableFile ? styles.editProperties  : styles.notShowProperties}`}>
                    <div className={`${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                        {modoEdicion ? (
                            <input
                                type="text"
                                name="adress"
                                className={styles.inputProperties}
                                value={formulario.adress}
                                onChange={manejarCambio}
                                onBlur={desactivarEdicion}
                            />
                        ) : (
                            <h1>{formulario.adress}</h1>
                        )}
                    </div>
                    <div className={`${isEditableFile ? styles.showProperties : styles.notShowProperties}`}>
                        {modoEdicion ? (
                            <input
                                type="text"
                                name="adressF"
                                className={styles.inputProperties}
                                value={formulario.adressF}
                                onChange={manejarCambio}
                                onBlur={desactivarEdicion}
                            />
                        ) : (
                            <h1>{formulario.adressF}</h1>
                        )}
                    </div>
                    <button onClick={activarEdicion} className={`${styles.editButtonProperties}`}><Image
                        src={'/icons/iconoEdit.png'}
                        alt={'Icono para editar'}
                        width={30}
                        height={30} />
                    </button>
                </div>
        </div>
    );
}