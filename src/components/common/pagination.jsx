import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ totalRows, currentPage, pageSize, onPageChange }) => {
  const getTotalPage = () => {
    let pages = [];
    var totalPages = Math.ceil(totalRows / pageSize);

    for (let index = 1; index < totalPages + 1; index++) {
      pages.push(index);
    }

    return pages;
  };

  if (getTotalPage().length <= 1) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {getTotalPage().map(page => (
          <li
            key={"li_" + page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <p
              className="page-link"
              onClick={() => {
                onPageChange(page);
              }}
              style={{ cursor: "pointer" }}
            >
              {page}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalRows: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
