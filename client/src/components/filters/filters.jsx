import { useDispatch, useSelector } from "react-redux";
import styles from "./filters.module.css";
import { useEffect } from "react";
import { allGenres, filterGenre } from "../../redux/actions";

const GenreFilter = () => {
    const genres = useSelector(state => state.genres);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allGenres());
    }, [dispatch]);

    const handleFilter = (e) => {
        dispatch(filterGenre(e.target.value));
    };

    const handleSourceFilter = (e) => {
        dispatch(filterGenre(e.target.value));
    };

    return (
        <div className={styles.filterContainer}>
            <select onChange={handleFilter} value={genres}>
                <option value="">Filter by genre</option>
                {genres?.map((genre) => (
                    <option key={genre.name} value={genre.name}>{genre.name}</option>
                ))}
            </select>

            <div>
                <span>Filter by source:</span>
                <label>
                    <input
                        type="radio"
                        value="API"
                        checked={genres === "API"}
                        onChange={handleSourceFilter}
                    />
                    API
                </label>
                <label>
                    <input
                        type="radio"
                        value="Database"
                        checked={genres === "Database"}
                        onChange={handleSourceFilter}
                    />
                    Database
                </label>
            </div>
        </div>
    );
};

export default GenreFilter;

