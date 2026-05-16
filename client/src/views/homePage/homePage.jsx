import styles from "./HomePage.module.css";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import {
  getVideogames,
  orderVideogames,
  orderVideogamesRating,
} from "../../redux/actions";

import GenreFilter from "../../components/filters/Filters.jsx";
import Card from "../../components/card/Card.jsx";
import Order from "../../components/order/Order.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

export default function HomePage() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.Videogames) || [];

  const [aux, setAux] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(10);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOrderAscDesc = (e) => {
    e.preventDefault();

    if (e.target.value === "default") {
      dispatch(getVideogames());
    } else {
      dispatch(orderVideogames(e.target.value));
    }

    setCurrentPage(1);
    setAux(!aux);
  };

  const handleOrderRating = (e) => {
    e.preventDefault();

    if (e.target.value === "default") {
      dispatch(getVideogames());
    } else {
      dispatch(orderVideogamesRating(e.target.value));
    }

    setCurrentPage(1);
    setAux(!aux);
  };

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>GAME LIBRARY</h2>
            <p>Search, sort and filter your videogames collection.</p>
          </div>

          <div className={styles.sidebarBlock}>
            <SearchBar setCurrentPage={setCurrentPage} />
          </div>

          <div className={styles.sidebarBlock}>
            <Order
              handleOrderAscDesc={handleOrderAscDesc}
              handleOrderRating={handleOrderRating}
            />
          </div>

          <div className={styles.sidebarBlock}>
            <GenreFilter setCurrentPage={setCurrentPage} />
          </div>

          <div className={styles.sidebarInfo}>
            <span className={styles.sidebarLabel}>RESULTS</span>
            <strong>{allVideogames.length} games</strong>
          </div>
        </aside>

        <section className={styles.contentArea}>
          <div className={styles.topRow}>
            <div className={styles.counter}>
              🎮 Showing {currentGames.length} of {allVideogames.length} games
            </div>
          </div>

          <div className={styles.cardsGrid}>
            {currentGames?.map((game) => (
              <Card
                key={game.id}
                id={game.id}
                name={game.name}
                image={game.image}
                genres={game.genres}
                rating={game.rating}
              />
            ))}
          </div>

          <div className={styles.paginationRow}>
            <Pagination
              currentPage={currentPage}
              gamesPerPage={gamesPerPage}
              allVideogames={allVideogames.length}
              paginate={paginate}
            />
          </div>
        </section>
      </div>
    </main>
  );
}