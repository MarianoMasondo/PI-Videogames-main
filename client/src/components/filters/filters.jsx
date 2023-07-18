import { useDispatch, useSelector } from "react-redux";
import styles from "./Filters.module.css";
import { useEffect, useState } from "react";
import { allGenres, filterApiDb, filterGenre } from "../../redux/actions";

const GenreFilter = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [aux, setAux] = useState(false);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allGenres());
  }, [dispatch]);

  const handleFilter = (e) => {
    setSelectedGenre(e.target.value);
    dispatch(filterGenre(e.target.value));
    setAux(!aux);
    props.setCurrentPage(1);
  };

  const handleSourceFilter = (e) => {
    setSelectedGenre(e.target.value);
    dispatch(filterApiDb(e.target.value));
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <select onChange={(e) => handleFilter(e)} value="default">
          <option value="default">Genre Filter</option>
          {genres?.map((genre) => (
            <option key={genre.name} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterContainerinput}>
        <span>Filter by source:</span>
        <label>
          <input
            type="radio"
            value="all"
            checked={selectedGenre === "all"}
            onChange={handleSourceFilter}
          />
          All
        </label>
        <label>
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
