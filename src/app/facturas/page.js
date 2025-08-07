"use client"
import React from "react"
import { ENDPOINT_API } from "@/utils/endpoints"
import BaseTable from "@/components/table/BaseTable"
import TableDataUI from "@/components/table/TableDataUI"
import dbTables from "@/utils/db_tables/tables"
import FilterField from "@/components/table/FilterField"
import TableDataFilters from "@/components/table/TableDataFilters"
import NavbarUI from "@/components/NavbarUI"
import { Suspense } from 'react'

export default function Page(){
    const {ot_facturas} = dbTables
    const {num_factura } = ot_facturas

    return(
        <div>
            <Suspense fallback={<div>...</div>}>
                <BaseTable dataURL={ENDPOINT_API.facturas} fieldID={"id"}>

                    <NavbarUI title={"Facturas"}>
                        {/* <BtnRedirect href="/facturas/new">+ Factura</BtnRedirect> */}
                    </NavbarUI>
                    <TableDataFilters>
                        <FilterField config={num_factura}/>
                    </TableDataFilters>
                
                    <TableDataUI config={ot_facturas}></TableDataUI>
                </BaseTable>   
            </Suspense>
        </div>
    )
}