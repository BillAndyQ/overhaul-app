"use client"
import React from "react"
import { ENDPOINT_API } from "@/utils/endpoints"
import BaseTable from "@/components/table/BaseTable"
import TableDataUI from "@/components/table/TableDataUI"
import dbTables from "@/utils/db_tables/tables"
import FilterField from "@/components/table/FilterField"
import TableDataFilters from "@/components/table/TableDataFilters"
import BtnRedirect from "@/components/BtnRedirect"
import NavbarUI from "@/components/NavbarUI"
import { Suspense } from 'react'

export default function Page(){
    const {compras : tb_compras} = dbTables
    const {num_factura } = tb_compras

    return(
        <div>
                        <Suspense fallback={<div>...</div>}>
            <BaseTable dataURL={ENDPOINT_API.compras}  fieldID={"id"}>

                <NavbarUI title={"Compras"}>
                    <BtnRedirect href="/compras/new">+ Compra</BtnRedirect>
                </NavbarUI>
                <TableDataFilters>
                    <FilterField config={num_factura}/>
                </TableDataFilters>
            
                <TableDataUI config={tb_compras}></TableDataUI>
            </BaseTable> 
                        </Suspense>            
        </div>
    )
}