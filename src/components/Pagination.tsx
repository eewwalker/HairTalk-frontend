'use client';

interface PaginatedProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page:number)=> void;
}



export default function Pagination({currentPage, totalPages, onPageChange}:PaginatedProps){
    return (
        <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={pageNumber === currentPage}
            className={`px-3 py-1 rounded ${pageNumber === currentPage ? 'bg-blue-500 text-[#ff99dd]' : 'bg-[#6ea4c1] text-[#ff99dd]'}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    )
}