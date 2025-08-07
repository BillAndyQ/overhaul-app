"use client"
import React from "react"
import { useTableContext } from "@/components/table/TableContext";

export default function TablePagination(){
    const {dataTable} = useTableContext()
    const cantidad = dataTable.length
    
    return(
        <nav className="m-0 d-flex gap-3 align-items-center" aria-label="Page navigation example">
            <ul className="pagination m-0">
                <li className="page-item">
                <a className="page-link border-0 border-start border-end rounded-0" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li className="page-item"><a className="page-link border-0 border-start border-end" href="#">1</a></li>
                <li className="page-item"><a className="page-link border-0 border-start border-end" href="#">2</a></li>
                <li className="page-item"><a className="page-link border-0 border-start border-end" href="#">3</a></li>
                <li className="page-item">
                <a className="page-link border-0 border-start border-end rounded-0" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
            <div className="text-xs">
                <span className="font-bold">{cantidad}</span>
                <span> Resultados</span>
            </div>
        </nav>
    )
}