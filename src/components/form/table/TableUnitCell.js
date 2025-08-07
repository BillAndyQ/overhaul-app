"use client"
import { useEffect, useState, useRef, useCallback } from "react";
import { useFormContext } from "../FormContext";
import FieldCell from "@/components/form/table/FieldCell";
import FileCell from "@/components/form/table/FileCell";
import MultiselectCell from "@/components/form/table/MultiselectCell";
import ChekCell from "@/components/form/table/CheckCell";
import DateCell from "./DateCell";

export default function TableUnitCell({ getDataUrl, config, nameTable, sendDataUrl, globalData = null }) {
    const { isSubmitting } = useFormContext();
    const columns = Object.keys(config);

    const originalDataRef = useRef({});

    const createEmptyRow = useCallback(() => {
        const emptyRow = {};
        for (const col of columns) {
            emptyRow[col] = config[col].type === "checkbox" ? "false" : "";
        }
        return emptyRow;
    }, [columns, config]);


    const [data, setData] = useState([createEmptyRow()]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(getDataUrl);
                const json = await res.json();
                console.log(json);
                
                const result = Array.isArray(json.result) ? json.result : [json.result];
                const row = result[0] || createEmptyRow();
                setData([row]);
                originalDataRef.current = row;
            } catch (err) {
                console.error("Error fetching table data:", err);
            }
        };

        fetchData();
    }, [getDataUrl, createEmptyRow]);

    useEffect(() => {
        if (!isSubmitting) return;

        const sendModifiedRow = async () => {
            const row = data[0];
            const originalRow = originalDataRef.current;
            let changedFields = {};

            if (row.id) {
            changedFields.id = row.id; // solo si existe el ID
            }

            for (const col of columns) {
                if (col !== "id" && row[col] !== originalRow[col]) {
                    changedFields[col] = row[col];
                }
            }


            if (Object.keys(changedFields).length === 0) return;

            try {
                const formData = new FormData();
                Object.entries(changedFields).forEach(([key, value]) => {
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
                console.error("❌ Error al enviar fila:", error);
            }
        };
        sendModifiedRow();
        window.location.reload();
        
    }, [isSubmitting, data, columns, sendDataUrl]);

    const handleChange = (columnName, value) => {
        setData((prevData) => {
            const updatedRow = { ...prevData[0], [columnName]: value };
            return [updatedRow];
        });
    };

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
                    <tr>
                        {columns.map((col) => {
                            const type = config[col].type;
                            const value = data[0][col] ?? "";

                            return (
                                <td key={col} className="p-0 text-nowrap text-xs">
                                    {(() => {
                                        switch (type) {
                                            case "file":
                                                return (
                                                    <FileCell
                                                        value={value}
                                                        accept=".pdf,.jpg,.png"
                                                        onChange={(file) => handleChange(col, file)}
                                                    />
                                                );
                                            case "text":
                                                return (
                                                    <FieldCell
                                                        type="text"
                                                        value={value}
                                                        onChange={(e) => handleChange(col, e.target.value)}
                                                    />
                                                );
                                            case "number":
                                                return (
                                                    <FieldCell
                                                        type="number"
                                                        value={value}
                                                        className="w-30"
                                                        onChange={(e) => handleChange(col, e.target.value)}
                                                    />
                                                );
                                            case "select_default":
                                                return (
                                                    <select
                                                        className="border-0"
                                                        value={value}
                                                        onChange={(e) => handleChange(col, e.target.value)}
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
                                                            onChange={(val) => handleChange(col, val)}
                                                    />
                                                );
                                            case "multiselect":
                                                return (
                                                    <MultiselectCell
                                                        allData={globalData[config[col].globalData]}
                                                        dataSelect={value}
                                                        onChange={(newArray) => handleChange(col, newArray)}
                                                    />
                                                );
                                            case "checkbox":
                                                return (
                                                    <ChekCell
                                                        value={value}
                                                        onChange={(e) =>
                                                            handleChange(col, e.target.checked ? "true" : "false")
                                                        }
                                                    />
                                                );
                                            default:
                                                return <span className="px-2">{value}</span>;
                                        }
                                    })()}
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
