import styles from "./searchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogames } from "../../redux/actions";

export default function SearchBar({onSearch}){
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  
  const handleChange = (event) => {
    event.preventDefault();    
    setName(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchVideogames(name))
    setName("");
  }
    return(
        <div className={styles.container}>         
            <input 
              onChange={handleChange} 
              placeholder="Search..." 
              type="seach" 
              value={name} 
              />
            <button 
            onClick={handleSearch}
            type="submit"
            >Go
            </button>
            
        
      </div>
    )
};