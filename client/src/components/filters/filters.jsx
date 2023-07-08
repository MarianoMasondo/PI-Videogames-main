// import { useDispatch, useSelector } from "react-redux";
// import styles from "./filters.module.css";
// import { useEffect } from "react";
// import { allGenres, filterGenre } from "../../redux/actions";

// const GenreFilter = () => {
//     //const genre = useSelector(state => state.genre);
//     const genres = useSelector(state => state.genres);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(allGenres());
//     }, [dispatch]);

//     const handleFilter = (e) => {
//         dispatch(filterGenre(e.target.value));
//     };

//     const handleSourceFilter = (e) => {
//         dispatch(filterGenre(e.target.value));
//     };

//     return (
//         <div className={styles.filterContainer}>
//             <select onChange={handleFilter} value={genres}>
//                 <option value="">Filter by genre</option>
//                 {genres?.map((genre) => (
//                     <option key={genre.name} value={genre.name}>{genre.name}</option>
//                 ))}
//             </select>

//             <div>
//                 <span>Filter by source:</span>
//                 <label>
//                     <input
//                         type="radio"
//                         value="API"
//                         checked={genres === "API"}
//                         onChange={handleSourceFilter}
//                     />
//                     API
//                 </label>
//                 <label>
//                     <input
//                         type="radio"
//                         value="Database"
//                         checked={genres === "Database"}
//                         onChange={handleSourceFilter}
//                     />
//                     Database
//                 </label>
//             </div>
//         </div>
//     );
// };

// export default GenreFilter;
import { useDispatch, useSelector } from "react-redux";
import styles from "./filters.module.css";
import { useEffect, useState } from "react";
import { allGenres, filterGenre } from "../../redux/actions";

const GenreFilter = () => {
  const [selectedGenre, setSelectedGenre] = useState(""); // New state for the selected genre
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allGenres());
  }, [dispatch]);

  const handleFilter = (e) => {
    setSelectedGenre(e.target.value); // Update the selected genre state
    dispatch(filterGenre(e.target.value));
  };

  const handleSourceFilter = (e) => {
    setSelectedGenre(e.target.value); // Update the selected genre state
    dispatch(filterGenre(e.target.value));
  };

  return (
    <div className={styles.filterContainer}>
      <select onChange={handleFilter} value={selectedGenre}>
        <option value="">Filter by genre</option>
        {genres?.map((genre) => (
          <option key={genre.name} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>

      <div>
        <label>
          <span>Filter by source:</span>
          <input
            type="radio"
            value="API"
            checked={selectedGenre === "API"}
            onChange={handleSourceFilter}
            />
          API
        </label>
        <label>
          <input
            type="radio"
            value="Database"
            checked={selectedGenre === "Database"}
            onChange={handleSourceFilter}
          />
          Database
        </label>
      </div>
    </div>
  );
};

export default GenreFilter;


