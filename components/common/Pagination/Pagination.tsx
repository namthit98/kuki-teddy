import React, { Fragment, useEffect, useState } from "react";
import styles from "./Pagination.module.css";

interface Props {
  totalRecords?: any;
  pageLimit?: number;
  pageNeighbours?: number;
  onPageChanged?: (a: any) => any;
}

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export const Pagination = (props: Props) => {
  const [totalRecords, setTotalRecords] = useState(
    props.totalRecords && typeof props.totalRecords === "number"
      ? props.totalRecords
      : 0
  );
  const [pageLimit, setPageLimit] = useState(
    props.pageLimit && typeof props.pageLimit === "number"
      ? props.pageLimit
      : 30
  );
  // pageNeighbours can be: 0, 1 or 2
  const [pageNeighbours, setPageNeighbours] = useState(
    props.pageNeighbours && typeof props.pageNeighbours === "number"
      ? Math.max(0, Math.min(props.pageNeighbours, 2))
      : 0
  );
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalRecords / pageLimit)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const gotoPage = (page: number) => {
    const { onPageChanged } = props;

    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords,
    };
    setCurrentPage(currentPage);
    // if (onPageChanged) onPageChanged(paginationData);
  };

  const handleClick = (page: any) => (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  const fetchPageNumbers = () => {
    const totalPagesLocal = totalPages;
    const currentPageLocal = currentPage;
    const pageNeighboursLocal = pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighboursLocal * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPagesLocal > totalBlocks) {
      const startPage = Math.max(2, currentPageLocal - pageNeighboursLocal);
      const endPage = Math.min(
        totalPagesLocal - 1,
        currentPageLocal + pageNeighboursLocal
      );

      let pages: any = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPagesLocal - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPagesLocal];
    }

    return range(1, totalPagesLocal);
  };

  useEffect(() => {
    gotoPage(1);
  }, [gotoPage]);

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <Fragment>
      <nav aria-label="Countries Pagination">
        <ul className={styles["pagination"]}>
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li
                  key={index}
                  className={styles["pagination__item"]}
                  onClick={handleMoveLeft}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li
                  key={index}
                  className={styles["pagination__item"]}
                  onClick={handleMoveRight}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </li>
              );

            return (
              <li
                key={index}
                className={`${styles["pagination__item"]} ${
                  currentPage === page ? styles["pagination__item--active"] : ""
                }`}
                onClick={handleClick(page)}
              >
                <span>{page}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </Fragment>
  );
};
