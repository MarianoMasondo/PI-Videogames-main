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

  const allVideogames = useSelector((state) => state.Videogames);

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
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>

        <h1 className={styles.title}>SPHERE</h1>
        <p className={styles.subtitle}>The Henry's Videogames App</p>
      </section>

      <section className={styles.controlPanel}>
        <Order
          handleOrderAscDesc={handleOrderAscDesc}
          handleOrderRating={handleOrderRating}
        />

        <SearchBar setCurrentPage={setCurrentPage} />

        <GenreFilter setCurrentPage={setCurrentPage} />
      </section>

      <section className={styles.gamesSection}>
        <div className={styles.cardsGrid}>
          {currentGames?.map((game) => {
            return (
              <Card
                key={game.id}
                id={game.id}
                name={game.name}
                image={game.image}
                genres={game.genres}
                rating={game.rating}
              />
            );
          })}
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.counter}>
            🎮 Showing {currentGames.length} of {allVideogames.length} games
          </div>

          <Pagination
            currentPage={currentPage}
            gamesPerPage={gamesPerPage}
            allVideogames={allVideogames.length}
            paginate={paginate}
          />
        </div>
      </section>
    </main>
  );
}