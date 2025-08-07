"use client";
import { useEffect, useState } from "react";
import ChekCell from "@/components/form/table/CheckCell";
import DateCell from "./DateCell";
import FileViewer from "@/components/table/FileViewer";

export default function TableCellReadonly({ getDataUrl, config, nameTable, globalData = null }) {
  const columns = Object.keys(config);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataUrl);
        const json = await res.json();
        console.log("Datos obtenidos:", json); // Depuración

        // Asegurarse de que json.result sea un arreglo y contenga objetos válidos
        const result = Array.isArray(json.result)
          ? json.result.filter((item) => item && typeof item === "object")
          : [json.result].filter((item) => item && typeof item === "object");

        setData(result.length > 0 ? result : []);
      } catch (err) {
        console.error("Error al obtener datos de la tabla:", err);
        setData([]);
      }
    };

    fetchData();
  }, [getDataUrl]);

  return (
    <div className="table-responsive pb-0 position-relative">
      <div className="d-flex gap-3 mb-2 mt-2">
        <span className="text-sm font-bold">{nameTable}</span>
      </div>
      <table className="table table-bordered table-hover overflow-x-scroll w-50">
        <thead>
          <tr>
            {columns.map((col) => (
              <th className="bg-light text-xs text-nowrap" key={col}>
                {config[col].label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length || 1} className="text-center text-gray-500 py-2">
                ...
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => {
                  const value = row && typeof row === "object" ? row[col] ?? "" : "";
                  const type = config[col].type;

                  switch (type) {
                    case "file":
                      return (
                        <td key={col}>
                          <FileViewer value={value}></FileViewer>
                        </td>
                      );
                    case "date":
                      return (
                        <td key={col} className="p-0 text-nowrap text-xs">
                          <DateCell value={value} disabled />
                        </td>
                      );
                    case "multiselect":
                      return (
                        <td key={col} className="p-0 text-nowrap px-2 text-xs">
                          {(value || []).join(", ")}
                        </td>
                      );
                    case "checkbox":
                      return (
                        <td key={col} className="p-0 text-nowrap text-xs">
                          <ChekCell value={value === "true" || value === true} disabled />
                        </td>
                      );
                    default:
                      return (
                        <td key={col} className="p-0 text-nowrap text-xs">
                          {value}
                        </td>
                      );
                  }
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}