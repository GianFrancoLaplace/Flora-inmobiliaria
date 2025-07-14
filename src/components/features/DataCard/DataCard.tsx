'use client'
import Image from 'next/image';
import styles from './DataCard.module.css'
import EditableField from "@/components/TechnicalFile/EditField";
import EditButton from "@/components/TechnicalFile/EditButton";

type Props = {
    imgSrc: string;
    label: string;
    value: string;
};

export default function dataCard({ imgSrc, label, value }: Props) {
    return(
        <main>
            <div className={styles.infoCardProperties}>
                <Image
                    src={imgSrc}
                    alt={'icono acorde a la informacion proporcionada'}
                    width={20}
                    height={20}
                />
                <h5>{value}</h5>
                <h5>{label}</h5>
            </div>
        </main>
    )
}