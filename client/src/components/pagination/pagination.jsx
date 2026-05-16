import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ currentPage, gamesPerPage, allVideogames, paginate }) => {
  const totalPages = Math.ceil(allVideogames / gamesPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const goPrev = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const goNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className={style.paginationContainer}>
      <button onClick={goPrev} disabled={currentPage === 1}>
        « Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => paginate(page)}
          className={currentPage === page ? style.active : ""}
        >
          {page}
        </button>
      ))}

      <button onClick={goNext} disabled={currentPage === totalPages}>
        Next »
      </button>
    </div>
  );
};

export default Pagination;