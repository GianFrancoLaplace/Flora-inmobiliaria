import styles from './BigCard.module.css'
import {cactus} from "@/app/ui/fonts";
import BigCard from "@/components/BigCards/BigCard";

export default function BigCardsGrid() {
    return(
        <main className={`${styles.grid} ${cactus.className}`}>
            <BigCard/>
            <BigCard/>
            <BigCard/>
            <BigCard/>
            <BigCard/>
            <BigCard/>
            <BigCard/>
        </main>
    )
}