"use client"
import React from "react"
import BaseFormUpdate from "@/components/form/BaseFormUpdate"
import TableUnitCell from "@/components/form/table/TableUnitCell"
import dbTables from "@/utils/db_tables/tables"

export default function Page(){
    const {compras} = dbTables


    return(
        <div>
            <BaseFormUpdate>
                <TableUnitCell config={compras}></TableUnitCell>
            
            </BaseFormUpdate>
        </div>
    )
}