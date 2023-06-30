import styles from "./searchBar.module.css";

export default function SearchBar(){
    return(
        <div className={styles.container}>
        <input type="search" placeholder="Insert game name" />
        </div>
    )
};