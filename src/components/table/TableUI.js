import React from "react";

export default function TableUI({ data = [] }) {
  if (!data.length) return <p>No data</p>;

  // Aplanar todos los objetos
const flattenedData = data.map(item => flattenObject(item));

  console.log(flattenedData);

  // Obtener columnas desde la primera fila
  const columns = Object.keys(flattenedData[0]);

  function flattenObject(obj, prefix = '') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(acc, flattenObject(value, fullKey));
        } else {
        acc[fullKey] = value;
        }

        return acc;
    }, {});
    }

  return (
      <div className="table-responsive h-full">
        <table className="table table-bordered table-hover overflow-x-scroll w-50">
            <thead>
                <tr>
                {columns.map(col => (
                  <th className="bg-light text-xs" key={col}>{col}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {flattenedData.map((item, i) => (
                <tr key={i}>
                  {columns.map(col => (
                    <td className="px-2 py-1 text-xs text-nowrap" key={col}>{item[col]}</td>
                  ))}
                </tr>
                ))}
            </tbody>
        </table>
      </div>
  );
}
