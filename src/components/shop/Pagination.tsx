import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  function handlePrevPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPageChange(Math.max(1, currentPage - 1));
  }

  function handleNextPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPageChange(Math.min(totalPages, currentPage + 1));
  }

  function handlePageChange(page: number) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPageChange(page);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-20 text-xs">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 transition-all ${
          currentPage === 1
            ? "opacity-30 cursor-not-allowed text-neutral-400"
            : "hover:bg-neutral-900 hover:text-white text-neutral-700 bg-white"
        }`}
      >
        <FiChevronLeft className="text-sm" />
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        const isActive = currentPage === pageNumber;
        return (
          <button
            key={index}
            onClick={() => handlePageChange(pageNumber)}
            className={`h-9 min-w-[36px] px-2 rounded-full font-semibold transition-all duration-200 ${
              isActive
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 transition-all ${
          currentPage === totalPages
            ? "opacity-30 cursor-not-allowed text-neutral-400"
            : "hover:bg-neutral-900 hover:text-white text-neutral-700 bg-white"
        }`}
      >
        <FiChevronRight className="text-sm" />
      </button>
    </div>
  );
}