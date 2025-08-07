"use client";
import React, { useState, useEffect, useMemo } from "react";
import TablePagination from "@/components/table/TablePagination";
import { useTableContext } from "@/components/table/TableContext";
import FileViewer from "./FileViewer";
import { usePathname, useRouter } from "next/navigation";

export default function TableDataUI({ config }) {
  const router = useRouter();
  const pathname = usePathname();
  const { dataTable, fieldID } = useTableContext();

  // Memoize initialColumns to ensure stability
  const initialColumns = useMemo(
    () => (dataTable && dataTable.length > 0 ? Object.keys(dataTable[0] || {}) : []),
    [dataTable]
  );

  // Initialize column order
  const [columnOrder, setColumnOrder] = useState(initialColumns);

  // Custom array equality check for performance
  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, i) => val === arr2[i]);
  };

  // Load column order from localStorage
  useEffect(() => {
    if (!dataTable || dataTable.length === 0) return;

    const savedOrder = localStorage.getItem("columnOrder");
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        const valid = parsed.filter((col) => initialColumns.includes(col));
        const missing = initialColumns.filter((col) => !valid.includes(col));
        const newOrder = [...valid, ...missing];

        // Only update if the order has changed
        if (!arraysEqual(newOrder, columnOrder)) {
          setColumnOrder(newOrder);
        }
      } catch (err) {
        console.error("Error al cargar orden de columnas:", err);
      }
    } else if (!arraysEqual(columnOrder, initialColumns)) {
      setColumnOrder(initialColumns);
    }
  }, [dataTable, initialColumns]); // Removed columnOrder from dependencies

  // Save column order to localStorage
  useEffect(() => {
    if (columnOrder.length > 0) {
      localStorage.setItem("columnOrder", JSON.stringify(columnOrder));
    }
  }, [columnOrder]);

  // Early return for empty data
  if (!dataTable || dataTable.length === 0) {
    return (
      <div className="text-center text-muted py-4">
        No hay resultados para mostrar.
      </div>
    );
  }

  return (
    <div className="h-table-data">
      <div className="table-responsive h-full position-relative">
        <table className="table table-bordered table-hover overflow-x-scroll">
          <thead>
            <tr className="sticky-top z-3 bg-light">
              <th className="p-0 sticky-top z-3 start-0 bg-light">
                <div className="border-end d-flex h-8 w-8 align-items-center justify-content-center">
                  <input type="checkbox" />
                </div>
              </th>
              {columnOrder.map((col, index) => {
                if (config[col]?.type === "hidden") return null;

                return (
                  <th
                    key={col}
                    scope="col"
                    className="px-2 py-1 text-xs bg-light text-nowrap"
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("colIndex", index.toString())
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const draggedColIndex = parseInt(
                        e.dataTransfer.getData("colIndex")
                      );
                      if (draggedColIndex === index || isNaN(draggedColIndex)) return;

                      const updatedOrder = [...columnOrder];
                      const [movedCol] = updatedOrder.splice(draggedColIndex, 1);
                      updatedOrder.splice(index, 0, movedCol);
                      setColumnOrder(updatedOrder);
                    }}
                  >
                    {config[col]?.label || col}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((item, i) => (
              <tr key={i} className="cursor-pointer">
                <td className="sticky-top start-0 z-1 p-0">
                  <div className="border-end d-flex h-8 w-8 align-items-center justify-content-center">
                    <input type="checkbox" />
                  </div>
                </td>
                {columnOrder.map((col) => {
                  if (config[col]?.type === "hidden") return null;

                  return (
                    <td
                      key={col}
                      className="text-xs p-0 text-nowrap"
                      onDoubleClick={() =>
                        item[fieldID] && router.push(`${pathname}/${item[fieldID]}`)
                      }
                    >
                      {config[col]?.type === "file" ? (
                        <FileViewer value={item[col]} />
                      ) : (
                        <span className="px-2 py-1">{item[col]}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex border-top align-items-center">
        <TablePagination />
      </div>
    </div>
  );
}