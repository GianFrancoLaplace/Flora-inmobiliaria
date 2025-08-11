"use client"

import styles from './ContactInformation.module.css'

export default function ContactInformation() {
    return (
        <div className={styles.contactProperties}>
            <div className={styles.carouselProperties}>
                <div className={styles.carouselContent}>
                    <h6>@floracordeiro_inmobiliaria</h6>
                    <h6>floracordeiroinmobiliaria@gmail.com</h6>
                    <h6>2494 20-8037</h6>
                </div>
                <div className={styles.carouselContent}>
                    <h6>@floracordeiro_inmobiliaria</h6>
                    <h6>floracordeiroinmobiliaria@gmail.com</h6>
                    <h6>2494 20-8037</h6>
                </div>
                <div className={styles.carouselContent}>
                    <h6>@floracordeiro_inmobiliaria</h6>
                    <h6>floracordeiroinmobiliaria@gmail.com</h6>
                    <h6>2494 20-8037</h6>
                </div>
            </div>
        </div>
    )
}