import React from 'react'
import style from './Pagination.module.css'

const Pagination = ({currentPage,gamesPerPage, allVideogames, paginate}) => {

  const pages = [];
  // redondea el numero de pagina para arriba totales
  const totalPages = Math.ceil(allVideogames/ gamesPerPage);
  
  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }
  return (
    <nav className={style.paginationContainer}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => paginate(page)}
          className={currentPage === page ? style.active : ''}
        >
        {page}
        </button>
        ))}
    </nav>
  );

};

export default Pagination;
