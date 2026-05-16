import { useDispatch, useSelector } from "react-redux";
import styles from "./Filters.module.css";
import { useEffect } from "react";
import { allGenres, filterApiDb, filterGenre } from "../../redux/actions";

const GenreFilter = ({ setCurrentPage }) => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allGenres());
  }, [dispatch]);

  const handleFilter = (e) => {
    dispatch(filterGenre(e.target.value));

    if (setCurrentPage) {
      setCurrentPage(1);
    }
  };

  const handleSourceFilter = (e) => {
    dispatch(filterApiDb(e.target.value));

    if (setCurrentPage) {
      setCurrentPage(1);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.selectGroup}>
        <label>FILTER BY GENRE</label>

        <select onChange={(e) => handleFilter(e)} defaultValue="default">
          <option value="default">All Genres</option>

          {genres?.map((genre) => (
            <option key={genre.id || genre.name} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.sourceGroup}>
        <label>FILTER BY SOURCE</label>

        <div className={styles.sourceButtons}>
          <label>
            <input
              type="radio"
              name="source"
              value="all"
              defaultChecked
              onChange={(e) => handleSourceFilter(e)}
            />
            <span>All</span>
          </label>

          <label>
            <input
              type="radio"
              name="source"
              value="api"
              onChange={(e) => handleSourceFilter(e)}
            />
            <span>API</span>
          </label>

          <label>
            <input
              type="radio"
              name="source"
              value="db"
              onChange={(e) => handleSourceFilter(e)}
            />
            <span>Database</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;