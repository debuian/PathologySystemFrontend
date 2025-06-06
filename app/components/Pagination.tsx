import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
}) {
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const visiblePages = 5;
    let startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

    if (currentPage <= 4) {
      startPage = 2;
      endPage = 6;
    } else if (currentPage >= totalPages - 3) {
      startPage = totalPages - 5;
      endPage = totalPages - 1;
    }

    const pages: (number | string)[] = [1];

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Data per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onPageChange(1);
          }}
          className="border rounded p-1 text-sm"
          aria-label="Items per page"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded disabled:opacity-50 hover:bg-gray-100"
          aria-label="First page"
        >
          <ChevronsLeft size={16} strokeWidth={1.5} />
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded disabled:opacity-50 hover:bg-gray-100"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={
                typeof pageNumber === "string"
                  ? `ellipsis-${index}`
                  : pageNumber
              }
              onClick={() =>
                typeof pageNumber === "number" && onPageChange(pageNumber)
              }
              disabled={typeof pageNumber !== "number"}
              className={`min-w-[32px] h-8 rounded text-sm flex items-center justify-center ${
                currentPage === pageNumber
                  ? "bg-black text-white font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              } ${typeof pageNumber !== "number" ? "cursor-default" : ""}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded disabled:opacity-50 hover:bg-gray-100"
          aria-label="Next page"
        >
          <ChevronRight size={16} strokeWidth={1.5} />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded disabled:opacity-50 hover:bg-gray-100"
          aria-label="Last page"
        >
          <ChevronsRight size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
