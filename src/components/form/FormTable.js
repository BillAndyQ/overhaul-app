"use client";
import React, {useState} from "react";
import AutoInput from "./AutoInput";
import { useFormContext } from "./FormContext";
import FormFieldCell from "./FormField";

export default function FormTable({ config, nameTable }) {
  const { dataForm, setDataForm} = useFormContext();
  const [changedRows, setChangedRows] = useState({});

  const columns = Object.keys(config);
  const data = Array.isArray(dataForm[nameTable]) ? dataForm[nameTable] : [];

  const handleChange = (tableName, rowIndex, columnName, value) => {
    setDataForm(prevForm => {
        const updatedTable = [...(prevForm[tableName] || [])];
        const updatedRow = { ...(updatedTable[rowIndex] || {}) };

        updatedRow[columnName] = value;
        updatedTable[rowIndex] = updatedRow;

        return {
        ...prevForm,
        [tableName]: updatedTable,
        };
    });
  };

  const capitalizar = (str) =>
  typeof str === "string" && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : "";

  const fieldKey = nameTable;

  function addRowTable() {
    const fields = Object.keys(config);

    const newRow = fields.reduce((acc, key) => {
      acc[key] = ""; // o null, etc.
      return acc;
    }, {});

    setDataForm(prevForm => {
      const prevTable = Array.isArray(prevForm[nameTable]) ? [...prevForm[nameTable]] : [];
      return {
        ...prevForm,
        [nameTable]: [...prevTable, newRow], // nueva copia del array con fila añadida
      };
    });
  }
  
  return (
    <div>
      <div className="table-responsive position-relative h-full">
        <div className="d-flex gap-3 mb-2 mt-2">
          <span className="text-sm font-bold">{capitalizar(nameTable)}</span>
          <button type="button" onClick={addRowTable} className="px-2 m-0 btn btn-outline-dark h-5 btn-sm d-flex align-items-center justify-content-center rounded-pill">
            + Unidad
          </button>
        </div>
        <table className="table table-bordered table-hover overflow-x-scroll w-50">
          <thead>
            <tr>
              {columns.map((col) => (
                <th className="bg-light text-xs" key={col}>
                  {config[col].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => {
                    const tipo = config[col]?.type || "text";
                    const value_input = dataForm?.[nameTable]?.[i]?.[col] || "";

                    return (
                      <td key={col} className="p-0">
                        {tipo === "file" && (
                          <input
                            type="file"
                            onChange={(e) =>
                              handleChange(fieldKey, i, col, e.target.files?.[0] || null)
                            }
                            className="p-0 px-1 bg-transparent border-0 text-xs"
                          />
                        )}

                        {tipo === "select" && (
                          <select
                            value={value_input}
                            onChange={(e) => handleChange(fieldKey, i, col, e.target.value)}
                            className="p-0 px-1 bg-transparent border-0 text-xs"
                          >
                            {(config[col].options || []).map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {tipo === "date" && (
                          <input
                            type="date"
                            value={value_input}
                            onChange={(e) => handleChange(fieldKey, i, col, e.target.value)}
                            className="p-0 px-1 bg-transparent border-0 text-xs"
                          />
                        )}

                        {(tipo === "text" || !["file", "select", "date"].includes(tipo)) && (
                          <FormFieldCell
                            value={value_input}
                            onChange={(e) => handleChange(fieldKey, i, col, e.target.value)}
                          />

                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">...</td>
              </tr>
            )}

          </tbody>
        </table>
         
      </div>
    </div>
  );
}
