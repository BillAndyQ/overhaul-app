"use client"
import { useEffect, useState, useRef } from "react";
import { useFormContext } from "../FormContext";
import FieldCell from "@/components/form/table/FieldCell";
import FileCell from "@/components/form/table/FileCell";
import MultiselectCell from "@/components/form/table/MultiselectCell";
import ChekCell from "@/components/form/table/CheckCell"
import DateCell from "./DateCell";

export default function TableCell({ getDataUrl, config, nameTable, sendDataUrl = "", globalData = null }) {
    const { isSubmitting } = useFormContext();
    const columns = Object.keys(config);

    const [data, setData] = useState([]);
    const originalDataRef = useRef([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(getDataUrl);
                const json = await res.json();
                const result = Array.isArray(json.result) ? json.result : [json.result];
                setData(result);
                originalDataRef.current = result;
            } catch (err) {
                console.error("Error fetching table data:", err);
            }
        };

        fetchData();
    }, [getDataUrl]);

    useEffect(() => {
        if (!isSubmitting) return;

        console.log("🟠 isSubmitting cambió a true");

        const sendModifiedRows = async () => {
            const modifiedRows = data.reduce((acc, row) => {
                const originalRow = originalDataRef.current.find(r => r.id === row.id);
                const changedFields = {};

                for (const col of columns) {
                    if (!originalRow || row[col] !== originalRow[col]) {
                        changedFields[col] = row[col];
                    }
                }

                if (Object.keys(changedFields).length > 0) {
                    acc.push({ ...(row.id && { id: row.id }), ...changedFields });
                }

                return acc;
            }, []);

            console.log("✅ Filas modificadas con cambios:", modifiedRows);

            if (modifiedRows.length === 0) return;

            if(sendDataUrl.length!=0){
                await Promise.all(
                    modifiedRows.map(async (row) => {
                        try {
                            const formData = new FormData();

                            Object.entries(row).forEach(([key, value]) => {
                                if (value instanceof File) {
                                    formData.append(key, value, value.name);
                                } else {
                                    formData.append(key, value);
                                }
                            });

                            const response = await fetch(sendDataUrl, {
                                method: "PUT",
                                body: formData,
                            });

                            const result = await response.json();
                            console.log("✅ Enviado:", result);
                        } catch (error) {
                            console.error("❌ Error al enviar fila modificada:", row.id, error);
                        }
                    })
                );

                // ✅ Recarga solo después de que todo fue enviado
                window.location.reload();
            }
        };

        sendModifiedRows();
    }, [isSubmitting, data, columns, sendDataUrl]);


    const handleChange = (rowId, columnName, value) => {
        setData(prevData =>
            prevData.map(row =>
                row.id === rowId
                    ? { ...row, [columnName]: value }
                    : row
            )
        );
    };

    function addRowTable() {
        const hasEmptyRow = data.some(row =>
            columns.every(col => row[col] === "")
        );

        if (hasEmptyRow) return; // Ya existe una fila vacía, no agregar otra

        const newRow = {
            id: Date.now(),
            ...Object.fromEntries(columns.map(col => [col, ""]))
        };

        setData(prev => [...prev, newRow]);
    }

    return (
        <div className="table-responsive pb-0 position-relative">
            <div className="d-flex gap-3 mb-2 mt-2">
                <span className="text-sm font-bold">{nameTable}</span>
                {
                    sendDataUrl!=0 && (
                    <button type="button" onClick={addRowTable} className="px-2 m-0 btn btn-outline-dark h-5 btn-sm d-flex align-items-center justify-content-center rounded-pill">
                        + {nameTable}
                    </button>
                    )
                }
                
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
                            <tr key={row.id ?? i}>
                                {columns.map((col) => 
                                (
                                    <td key={col} className="p-0 text-nowrap text-xs">
                                        {(() => {
                                            const type = config[col].type;
                                            const value = row[col] ?? "";
                                            
                                            switch (type) {
                                            case "file":
                                                return (
                                                <FileCell
                                                    value={row[col]}
                                                    accept=".pdf,.jpg,.png"
                                                    onChange={(file) => handleChange(row.id, col, file)}
                                                />
                                                );
                                            case "text":
                                                return (
                                                <FieldCell
                                                    type="text"
                                                    value={value}
                                                    onChange={(e) => handleChange(row.id, col, e.target.value)}
                                                />
                                                );
                                            case "number":
                                                return (
                                                <FieldCell
                                                    type="number"
                                                    value={value}
                                                    className="w-30"
                                                    onChange={(e) => handleChange(row.id, col, e.target.value)}
                                                />
                                                );
                                            case "select_default":
                                                return (
                                                <select
                                                    className="border-0"
                                                    value={value}
                                                    onChange={(e) => handleChange(row.id, col, e.target.value)}
                                                >

                                                    <option value="" disabled hidden>
                                                        Seleccione
                                                    </option>
                                                    {config[col].options?.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                    ))}
                                                </select>
                                                );
                                            case "date":
                                                return (
                                                <DateCell
                                                    value={value}
                                                     onChange={(val) => handleChange(row.id, col, val)}
                                                />
                                                );
                                            case "multiselect":
                                                return (
                                                <MultiselectCell
                                                    allData={globalData[config[col].globalData]}
                                                    dataSelect={row[col]}
                                                    onChange={(newArray) => handleChange(row.id, col, newArray)}
                                                />
                                            );

                                            case "checkbox":
                                                return (
                                                <ChekCell
                                                    value={value}
                                                    onChange={(e) => handleChange(row.id, col, e.target.checked ? "true" : "false")}
                                                />
                                                );
                                                
                                            default:
                                                return (
                                                <span className="px-2">{value}</span>
                                                );
                                            }
                                        })()}
                                        </td>

                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
