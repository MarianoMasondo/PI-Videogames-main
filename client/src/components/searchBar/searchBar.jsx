import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogames } from "../../redux/actions";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchVideogames(name));

    if (setCurrentPage) {
      setCurrentPage(1);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSearch}>
      <label className={styles.label}>SEARCH GAME</label>

      <div className={styles.searchBox}>
        <span className={styles.icon}>⌕</span>

        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Search games..."
        />

        <button type="submit">➜</button>
      </div>
    </form>
  );
}