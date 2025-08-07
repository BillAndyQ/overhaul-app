"use client"
import React from "react"

export default function Loader(){
    return(
        <div className="d-flex h-screen position-absolute top-0 w-screen start-0 justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}