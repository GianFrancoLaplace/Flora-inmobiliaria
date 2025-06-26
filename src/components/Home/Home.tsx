import PropertiesSearchBar from "@/components/features/SearchBar/SearchBar";
import styles from "@/components/Home/Home.module.css";

export default function Home()
{
    return (
        <div className={styles.imageProperties}>
            <div className={styles.navImageProperties}>
                <div className={styles.searchBarProperties}><PropertiesSearchBar/></div>
            </div>
        </div>

    );
}