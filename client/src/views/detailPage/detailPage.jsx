import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailVideogames } from "../../redux/actions";
import styles from "./DetailPage.module.css";

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const DetailGame = useSelector((state) => state.DetailGame);

  useEffect(() => {
    dispatch(detailVideogames(id));
  }, [dispatch, id]);

  const stripTags = (html) => {
    if (!html) return "No description available.";

    const div = document.createElement("div");
    div.innerHTML = html;

    return div.textContent || div.innerText || "No description available.";
  };

  const getGenres = () => {
    if (!DetailGame?.genres) return [];

    if (Array.isArray(DetailGame.genres)) {
      return DetailGame.genres
        .map((genre) => {
          if (typeof genre === "string") return genre;
          return genre?.name;
        })
        .filter(Boolean);
    }

    return [];
  };

  const getPlatforms = () => {
    if (!DetailGame?.platforms) return [];

    if (Array.isArray(DetailGame.platforms)) {
      return DetailGame.platforms
        .map((platform) => {
          if (typeof platform === "string") return platform;
          if (platform?.platform?.name) return platform.platform.name;
          if (platform?.name) return platform.name;
          return null;
        })
        .filter(Boolean);
    }

    if (typeof DetailGame.platforms === "string") {
      return DetailGame.platforms.split(",").map((platform) => platform.trim());
    }

    return [];
  };

  const genres = getGenres();
  const platforms = getPlatforms();

  return (
    <main className={styles.page}>
      <section className={styles.detailCard}>
        <div className={styles.imagePanel}>
          <Link to="/home" className={styles.backButton}>
            ← Back to games
          </Link>

          <div className={styles.imageWrapper}>
            {DetailGame?.image ? (
              <img src={DetailGame.image} alt={DetailGame.name} />
            ) : (
              <div className={styles.imagePlaceholder}>No image</div>
            )}
          </div>

          <div className={styles.scoreBox}>
            <span>Rating</span>
            <strong>⭐ {DetailGame?.rating || "N/A"}</strong>
          </div>
        </div>

        <div className={styles.infoPanel}>
          <span className={styles.badge}>GAME DETAIL</span>

          <h1>{DetailGame?.name || "Loading videogame..."}</h1>

          <div className={styles.tags}>
            {genres.length > 0 ? (
              genres.map((genre) => (
                <span key={genre} className={styles.tag}>
                  {genre}
                </span>
              ))
            ) : (
              <span className={styles.tag}>Unknown genre</span>
            )}
          </div>

          <p className={styles.description}>
            {stripTags(DetailGame?.description)}
          </p>

          <div className={styles.statsGrid}>
            <article className={styles.statCard}>
              <span>ID</span>
              <strong>#{DetailGame?.id || "N/A"}</strong>
            </article>

            <article className={styles.statCard}>
              <span>Released</span>
              <strong>{DetailGame?.released || "N/A"}</strong>
            </article>

            <article className={styles.statCard}>
              <span>Genres</span>
              <strong>
                {genres.length > 0 ? genres.slice(0, 3).join(", ") : "N/A"}
              </strong>
            </article>

            <article className={styles.statCard}>
              <span>Platforms</span>
              <strong>
                {platforms.length > 0
                  ? platforms.slice(0, 4).join(", ")
                  : "N/A"}
              </strong>
            </article>
          </div>

          <div className={styles.platformSection}>
            <h2>Available platforms</h2>

            <div className={styles.platforms}>
              {platforms.length > 0 ? (
                platforms.map((platform) => (
                  <span key={platform} className={styles.platformPill}>
                    {platform}
                  </span>
                ))
              ) : (
                <span className={styles.platformPill}>Unknown</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}