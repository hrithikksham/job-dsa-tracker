type PaginationProps = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        onClick={onPrevious}
        disabled={page <= 1}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}