import styles from "./searchBar.module.css";
import { useState } from "react";

export default function SearchBar(onSearch){
  const [searchGame, setSearchGame] = useState("");
  const handleInputChange = (e) => {
    setSearchGame(e.target.game);
  };

  const handleFormSubmit= (e) => {
    e.preventDefaul();
    onSearch(searchGame)
  }
    return(
        <div className={styles.container}>
          <form onSubmit={handleFormSubmit}>
            <input placeholder="Search..." type="text" value={searchGame} onChange={handleInputChange} />
            <button type="submit">Go</button>
          </form>
      </div>
    )
};