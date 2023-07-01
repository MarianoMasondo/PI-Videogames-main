import styles from "./searchBar.module.css";

export default function SearchBar(){
    return(
        <div className={styles.container}>
        <input placeholder="Search..." type="text" />
        <button type="submit">Go</button>
      </div>
    )
};