import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({ pageCount, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
        // previousLabel={'Previous'}
        // nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={css.break}
        // pageCount={pageCount}
        // marginPagesDisplayed={2}
        // pageRangeDisplayed={5}
        // onPageChange={onPageChange}
        // containerClassName={css.pagination}
        pageClassName={css.page}
        pageLinkClassName={css.pageLink}
        previousClassName={css.previous}
        previousLinkClassName={css.previousLink}
        nextClassName={css.next}
        nextLinkClassName={css.nextLink}
        // activeClassName={css.active}
    />
  );
}