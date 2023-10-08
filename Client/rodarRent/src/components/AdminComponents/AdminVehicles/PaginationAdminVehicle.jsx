const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleAdvance = () => {
    if (currentPage + 3 <= totalPages) {
      onPageChange(currentPage + 3);
    } else {
      onPageChange(totalPages);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleGoToStart = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handleGoToEnd = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];

    if (currentPage > 1) {
      buttons.push(
        <div key="prevButtons" className="flex gap-1">
          <button
            key="goToStart"
            className="cursor-pointer px-3 drop-shadow-lg border border-gray-300 rounded-lg"
            onClick={handleGoToStart}
          >
            {'<<'}
          </button>
          <button
            key="prev"
            className="cursor-pointer px-3 drop-shadow-lg border border-gray-300 rounded-lg"
            onClick={handlePrevPage}
          >
            {'<'}
          </button>
        </div>,
      );
    }

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);

    for (let page = start; page <= end; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`cursor-pointer py-1 px-3 drop-shadow-lg border-none rounded-lg ${
            currentPage === page
              ? 'font-semibold text-white bg-blue drop-shadow-lg'
              : 'font-normal'
          } `}
        >
          {page}
        </button>,
      );
    }

    //* if there's more than 3 pages show elipsis button
    if (currentPage + 3 < totalPages) {
      buttons.push(
        <button
          key="advance"
          className="cursor-pointer py-1 px-3 drop-shadow-lg border-none rounded-lg"
          onClick={handleAdvance}
        >
          ...
        </button>,
      );
    }

    //* Show next button if not last page
    if (currentPage < totalPages) {
      buttons.push(
        <div key="nextButtons" className="flex gap-1">
          <button
            key="next"
            className="cursor-pointer py-1 px-3 drop-shadow-lg border-none rounded-lg"
            onClick={handleNextPage}
          >
            {'>'}
          </button>
          <button
            key="goToEnd"
            className="cursor-pointer py-1 px-3 drop-shadow-lg border-none rounded-lg"
            onClick={handleGoToEnd}
          >
            {'>>'}
          </button>
        </div>,
      );
    }

    return buttons;
  };

  return (
    <div className=" w-1/5 pt-5 flex justify-evenly">{renderPageButtons()}</div>
  );
};

export default Pagination;
