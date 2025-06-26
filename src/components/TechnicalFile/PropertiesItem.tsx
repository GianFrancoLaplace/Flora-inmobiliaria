import styles from "@/components/TechnicalFile/TechnicalSheet.module.css";
import Image from "next/image";

type Props = {
    imgSrc: string;
    label: string;
    value: string;
};

export default function Item({ imgSrc, label, value }: Props) {
    return (
        <div className={styles.itemProperties}>
            <Image
                src={imgSrc}
                alt={'icono acorde a la informacion proporcionada'}
                width={20}
                height={20}
            />
            <h5>{label}: {value}</h5>
        </div>
    )
}