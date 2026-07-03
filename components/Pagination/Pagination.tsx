import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}