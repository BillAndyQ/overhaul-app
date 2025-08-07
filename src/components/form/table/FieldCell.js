"use client"
import React from "react"

export default function FieldCell({value, onChange, type, className}){
    return(
        <input
            type={type || "text"}
            value={value}
            onChange={onChange}
            className={`p-0 px-1 bg-transparent border-0 text-xs ${className}`}
        />
    )
}