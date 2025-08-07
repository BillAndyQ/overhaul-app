"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "./FormContext";
import { getDataBack } from "@/utils/getData";

export default function FieldsAsync({ configs = [] }) {
  const { dataForm, handleChange, setValuesFromItem } = useFormContext();
  const [asyncDataMap, setAsyncDataMap] = useState({});

  useEffect(() => {
    const fetchAsyncData = async () => {
      const newDataMap = {};
      for (const config of configs) {
        if (!config || !config.async || !config.urlData) continue;

        const key = config.async;
        if (!newDataMap[key]) {
          try {
            const data = await getDataBack(config.urlData);
            console.log(`Data fetched for ${key}:`, data); // Debug log
            newDataMap[key] = Array.isArray(data) ? data : [];
          } catch (error) {
            console.error(`Error fetching data for ${key}:`, error);
            newDataMap[key] = [];
          }
        }
      }
      console.log("Setting asyncDataMap:", newDataMap); // Debug log
      setAsyncDataMap(newDataMap);
    };

    fetchAsyncData();
  }, [configs]);

  const normalizar = (str) => {
    if (typeof str !== "string" || str.length === 0) return "";
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const capitalizar = (str) =>
    typeof str === "string" && str.length > 0
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : "";

  const handleSelectChange = (e, config) => {
    const selectedFieldValue = e.target.value;
    const asyncKey = config.async;
    const options = asyncDataMap[asyncKey] || [];
    const fieldKey = normalizar(config.field);

    // Update the current field in the form context
    handleChange(fieldKey, selectedFieldValue);

    // Find the selected item using fieldData or field
    const selectedItem = options.find(
      (item) => String(item[config.fieldData || config.field]) === selectedFieldValue
    );

    console.log("Selected item:", selectedItem, "Value:", selectedFieldValue); // Debug log

    if (selectedItem && config.syncFields?.length > 0) {
      const mappedFields = {};
      config.syncFields.forEach((field) => {
        const targetConfig = configs.find(c => c.field === field);
        const targetFieldData = targetConfig?.fieldData || field;
        if (selectedItem[targetFieldData]) {
          mappedFields[normalizar(field)] = selectedItem[targetFieldData];
        }
      });
      console.log("Mapped fields for sync:", mappedFields); // Debug log
      setValuesFromItem(mappedFields, Object.keys(mappedFields));
    }
  };

  return (
    <>
      {configs
        .filter((config) => config && config.field && config.async)
        .map((config) => {
          const asyncKey = config.async;
          const options = asyncDataMap[asyncKey] || [];
          console.log(`Options for ${config.field}:`, options); // Debug log

          const fieldKey = normalizar(config.field);
          const value = dataForm[fieldKey] || "";

          return (
            <div key={config.field} className="mb-3 form-floating">
              <select
                id={fieldKey}
                className="form-select"
                name={fieldKey}
                value={value}
                onChange={(e) => handleSelectChange(e, config)}
              >
                <option value="" disabled>
                  Seleccione {capitalizar(config.label)}
                </option>
                {options.map((item) => (
                  <option
                    className="text-xs"
                    key={item.id}
                    value={item[config.fieldData || config.field]}
                  >
                    {item[config.fieldData || config.field]}
                  </option>
                ))}
              </select>
              <label className="form-label">{capitalizar(config.label)}</label>
            </div>
          );
        })}
    </>
  );
}