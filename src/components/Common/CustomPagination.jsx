import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const CustomPagination = ({ pagination, onPageChange }) => {
  const { current_page, last_page } = pagination;
  
  const getPageRange = () => {
    const maxPagesToShow = 10;
    const halfRange = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, current_page - halfRange);
    let endPage = Math.min(last_page, current_page + halfRange);

    if (current_page <= halfRange) {
      endPage = Math.min(maxPagesToShow, last_page);
    }

    // Adjust if we're near the end
    if (current_page > last_page - halfRange) {
      startPage = Math.max(1, last_page - maxPagesToShow + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pages = getPageRange();

  return (
    <Pagination className="mt-4">
      <PaginationItem disabled={current_page === 1}>
        <PaginationLink first onClick={() => onPageChange(1)} />
      </PaginationItem>

      <PaginationItem disabled={current_page === 1}>
        <PaginationLink
          previous
          onClick={() => onPageChange(current_page - 1)}
        />
      </PaginationItem>

      {pages[0] > 1 && (
        <PaginationItem disabled>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      )}

      {pages.map((page) => (
        <PaginationItem key={page} active={page === current_page}>
          <PaginationLink onClick={() => onPageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      {/* Show ellipsis if there are pages after the range */}
      {pages[pages.length - 1] < last_page && (
        <PaginationItem disabled>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      )}

      <PaginationItem disabled={current_page === last_page}>
        <PaginationLink next onClick={() => onPageChange(current_page + 1)} />
      </PaginationItem>

      <PaginationItem disabled={current_page === last_page}>
        <PaginationLink last onClick={() => onPageChange(last_page)} />
      </PaginationItem>
    </Pagination>
  );
};

export default CustomPagination;
