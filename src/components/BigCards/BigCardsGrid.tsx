import styles from './BigCard.module.css'
import {cactus} from "@/app/ui/fonts";
import BigCard from "@/components/BigCards/BigCard";

export default function BigCardsGrid() {
    return(
        <main className={`${styles.grid} ${cactus.className}`}>
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
        </main>
    )
}