"use client";
import React from "react";
import { FilterProvider, useFilter } from "./FilterContext";

import { useRouter, usePathname } from "next/navigation";


function FiltersWrapper({ children }) {
    const router = useRouter();
    const { filters } = useFilter();
    const pathname = usePathname();
    const handleSearch = () => {
        const query = new URLSearchParams();

        for (const key in filters) {
          if (filters[key]?.trim()) {
              query.set(key, filters[key]);
          }
        }
        
        const queryString = query.toString();
        const newUrl = queryString ? `?${queryString}` : pathname; 

        console.log("Filtros aplicados:", filters);
        router.push(newUrl);

    };

  return (
    <div className="mx-3">
      <div className="d-flex h-15 gap-2 align-items-center justify-content-between">
        <div className="d-flex gap-2">
          {children}
        </div>
        <button
          onClick={handleSearch}
          className="btn btn-primary text-xs rounded btn-sm d-inline-block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search-icon lucide-search"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          <span className="mx-1">Buscar</span>
        </button>
      </div>
    </div>
  );
}

export default function TableDataFilters({ children }) {
  return (
    <FilterProvider>
      <FiltersWrapper>{children}</FiltersWrapper>
    </FilterProvider>
  );
}
