import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogames } from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
    dispatch(searchVideogames(event.target.value)); // para buscar juegos que coincidan con la letra ingresada
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // if(!name){
    //   return alert("This game doesnt exist") ver eeror de juego inexistente
    // }
    dispatch(searchVideogames(name));
    setName("");
  };

  return (
    <div className={styles.container}>
      <form action="">
        <input
          onChange={handleChange}
          placeholder="Search..."
          type="search"
          value={name}
        />
        <button onClick={handleSearch} type="submit">
          Go
        </button>
      </form>
    </div>
  );
}
