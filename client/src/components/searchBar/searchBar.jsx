import styles from "./searchBar.module.css";
import { useState } from "react";

export default function SearchBar({onSearch}){
  const [name, setName] = useState("");
  
  const handleChange = event => {
    const {value} = event.target;
    setName(value);
    console.log(name)
  };

  const handleSearch = () => {
    onSearch(name);
    setName("");
  }
    return(
        <div className={styles.container}>         
            <input 
              placeholder="Search..." 
              type="text" 
              value={name} 
              onChange={handleChange} 
              />
            <button onClick={handleSearch}>Go</button>
        
      </div>
    )
};