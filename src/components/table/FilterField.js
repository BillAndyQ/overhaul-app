"use client";
import React from "react";
import { useFilter } from "./FilterContext";

export default function FilterField({ config }) {
  const { filters, updateFilter } = useFilter();
  const fieldKey = config.field;

  return (
    <div className="floating-input-group">
      <input
        type="text"
        className="text-xs floating-input"
        value={filters[fieldKey] || ""}
        onChange={(e) => updateFilter(fieldKey, e.target.value)}
      />
      <label className="floating-label">{config.label}</label>
    </div>
  );
}
