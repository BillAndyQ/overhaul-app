"use client"
import React from "react"
import BaseTable from "@/components/table/BaseTable"
import TableDataUI from "@/components/table/TableDataUI"
import TableDataFilters from "@/components/table/TableDataFilters"
import NavbarUI from "@/components/NavbarUI"
import BtnRedirect from "@/components/BtnRedirect"
import FilterField from "@/components/table/FilterField"

import { ENDPOINT_API } from "@/utils/endpoints"
import dbTables from "@/utils/db_tables/tables"
import { Suspense } from "react"

export default function Page(){
    const {empresas} = dbTables
    const {razon_social, ruc, direccion} = empresas
    return(
        <div>
            <Suspense fallback={<div>...</div>}>
            <BaseTable dataURL={ENDPOINT_API.empresas} fieldID={"id"}>
                <NavbarUI title={"Empresas"}>
                    <BtnRedirect href="/empresas/new">+ Empresa</BtnRedirect>
                </NavbarUI>
                <TableDataFilters>
                    <FilterField config={razon_social}/>
                    <FilterField config={ruc}/>
                    <FilterField config={direccion}/>
                </TableDataFilters>
                <TableDataUI config={empresas}></TableDataUI>
            </BaseTable>
            </Suspense>
        </div>
    )
}