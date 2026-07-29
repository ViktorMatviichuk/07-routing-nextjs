import React from 'react';
import type { ComponentType } from "react";
import ReactPaginate from "react-paginate";
import css from './Pagination.module.css';

export interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage?: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange, forcePage }) => {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      forcePage={forcePage}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};

export default Pagination;
