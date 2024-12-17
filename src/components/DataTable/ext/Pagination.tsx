import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';
import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  totalRows: number;
  pageSize?: number;
  firstRow?: number;
  pageSiblings?: number;
  onChangePage: (page: number) => void;
}

type PageProps = {
  number: number;
  showByDefault: boolean;
  sibling: boolean;
  separator: boolean;
};

export function Pagination({
  totalRows,
  firstRow = 0,
  pageSiblings = 2,
  pageSize = 10,
  // onChangePageSize,
  onChangePage,
}: PaginationProps) {
  const currentPage = Math.floor(firstRow / pageSize) + 1;
  const lastPage = Math.floor(totalRows / pageSize) + 1;

  const pages: PageProps[] = Array.from(Array(lastPage).keys())
    .map((index) => {
      const showByDefault = [1, currentPage, lastPage].includes(index + 1);
      const sibling = Math.abs(index + 1 - currentPage) <= pageSiblings;
      const separator =
        !(Math.abs(index + 1 - currentPage) <= pageSiblings) &&
        Math.abs(index + 1 - currentPage) <= pageSiblings + 1;

      return {
        number: index + 1,
        showByDefault,
        sibling,
        separator,
      };
    })
    .filter((page) => page.showByDefault || page.sibling || page.separator);

  const handleChangePage = useCallback(
    (page: number) => {
      onChangePage(page);
    },
    [onChangePage],
  );

  return (
    <div className="flex text-sm">
      <PaginationButton
        pageNumber={1}
        onChangePage={() => handleChangePage(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </PaginationButton>

      {pages.map((page) => (
        <PaginationButton
          key={page.number}
          pageNumber={page.number}
          isCurrent={page.number === currentPage}
          onChangePage={() =>
            page.showByDefault || page.sibling
              ? handleChangePage(page.number)
              : null
          }
        >
          {page.showByDefault || page.sibling ? page.number : '...'}
        </PaginationButton>
      ))}

      <PaginationButton
        pageNumber={1}
        onChangePage={() => handleChangePage(currentPage + 1)}
        isDisabled={currentPage === lastPage}
      >
        <ChevronRight size={20} />
      </PaginationButton>
    </div>
  );
}
