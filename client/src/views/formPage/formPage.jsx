import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import styles from "./FormPage.module.css";
import axios from "axios";
import { allGenres } from "../../redux/actions";

const validate = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Insert a valid name";
  }

  if (!form.description.trim()) {
    errors.description = "Insert a valid description";
  }

  if (!form.platforms.trim()) {
    errors.platforms = "Insert valid platforms";
  }

  if (!form.image.trim()) {
    errors.image = "Insert a valid image URL";
  } else if (!form.image.startsWith("http://") && !form.image.startsWith("https://")) {
    errors.image = "Image URL must start with http:// or https://";
  }

  if (!form.released) {
    errors.released = "Insert a valid release date";
  }

  if (!form.rating) {
    errors.rating = "Insert a valid rating";
  } else if (Number(form.rating) < 0 || Number(form.rating) > 5) {
    errors.rating = "Rating must be between 0 and 5";
  }

  if (form.genres.length === 0) {
    errors.genres = "Select at least one genre";
  }

  return errors;
};

const FormPage = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    released: "",
    rating: "",
    genres: [],
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(allGenres());
  }, [dispatch]);

  const handlerInputChange = (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updatedForm);
    setErrors(validate(updatedForm));
  };

  const handlerGenres = (e) => {
    const selectedGenre = e.target.value;

    if (selectedGenre === "default") return;

    if (!form.genres.includes(selectedGenre)) {
      const updatedForm = {
        ...form,
        genres: [...form.genres, selectedGenre],
      };

      setForm(updatedForm);
      setErrors(validate(updatedForm));
    }
  };

  const removeGenre = (genreToRemove) => {
    const updatedForm = {
      ...form,
      genres: form.genres.filter((genre) => genre !== genreToRemove),
    };

    setForm(updatedForm);
    setErrors(validate(updatedForm));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const formErrors = validate(form);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    try {
      await axios.post("http://localhost:3001/videogames", form);

      alert("Game created successfully");

      setForm({
        name: "",
        description: "",
        platforms: "",
        image: "",
        released: "",
        rating: "",
        genres: [],
      });

      setErrors({});
      setSubmitted(false);
    } catch (error) {
      alert("Please fill in all the fields");
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.formCard}>
        <div className={styles.leftPanel}>
          <span className={styles.badge}>CREATE MODE</span>

          <h1>Create Videogame</h1>

          <p>
            Add a new title to your videogame library. Complete the fields,
            select genres and launch it into your collection.
          </p>

          <div className={styles.previewBox}>
            <div className={styles.previewImage}>
              {form.image ? (
                <img src={form.image} alt={form.name || "Game preview"} />
              ) : (
                <span>IMAGE PREVIEW</span>
              )}
            </div>

            <div className={styles.previewInfo}>
              <h2>{form.name || "New Videogame"}</h2>
              <p>{form.platforms || "Platforms will appear here"}</p>
              <strong>⭐ {form.rating || "0.0"}</strong>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={form.name}
              placeholder="Grand Theft Auto V"
              onChange={handlerInputChange}
            />
            {submitted && errors.name && (
              <span className={styles.errorMessage}>{errors.name}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              className={styles.textarea}
              name="description"
              value={form.description}
              placeholder="Write a short description..."
              onChange={handlerInputChange}
            />
            {submitted && errors.description && (
              <span className={styles.errorMessage}>{errors.description}</span>
            )}
          </div>

          <div className={styles.twoColumns}>
            <div className={styles.inputGroup}>
              <label>Platforms</label>
              <input
                className={styles.input}
                type="text"
                name="platforms"
                value={form.platforms}
                placeholder="PC, PlayStation, Xbox"
                onChange={handlerInputChange}
              />
              {submitted && errors.platforms && (
                <span className={styles.errorMessage}>{errors.platforms}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Rating</label>
              <input
                className={styles.input}
                type="number"
                name="rating"
                value={form.rating}
                min="0"
                max="5"
                step="0.01"
                placeholder="4.50"
                onChange={handlerInputChange}
              />
              {submitted && errors.rating && (
                <span className={styles.errorMessage}>{errors.rating}</span>
              )}
            </div>
          </div>

          <div className={styles.twoColumns}>
            <div className={styles.inputGroup}>
              <label>Release date</label>
              <input
                className={styles.input}
                type="date"
                name="released"
                value={form.released}
                onChange={handlerInputChange}
              />
              {submitted && errors.released && (
                <span className={styles.errorMessage}>{errors.released}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Genres</label>
              <select
                className={styles.select}
                onChange={handlerGenres}
                defaultValue="default"
              >
                <option value="default" disabled>
                  Select genres
                </option>

                {genres?.map((genre) => (
                  <option key={genre.id || genre.name} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>

              {submitted && errors.genres && (
                <span className={styles.errorMessage}>{errors.genres}</span>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Image URL</label>
            <input
              className={styles.input}
              type="text"
              name="image"
              value={form.image}
              placeholder="https://image-url.com/game.jpg"
              onChange={handlerInputChange}
            />
            {submitted && errors.image && (
              <span className={styles.errorMessage}>{errors.image}</span>
            )}
          </div>

          <div className={styles.selectedGenres}>
            {form.genres.length > 0 ? (
              form.genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className={styles.genreTag}
                  onClick={() => removeGenre(genre)}
                >
                  {genre} ×
                </button>
              ))
            ) : (
              <span className={styles.emptyGenres}>No genres selected yet</span>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            + Create Videogame
          </button>
        </form>
      </section>
    </main>
  );
};

export default FormPage;