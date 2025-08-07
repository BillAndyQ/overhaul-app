"use client"
import React from "react"

export default function CheckCell({ value, onChange, ...props }) {
  return (
    <input
      {...props}
      type="checkbox"
      checked={value === "true" || value === true}
      onChange={onChange}
      className="w-full"
    />
  )
}
