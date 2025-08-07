"use client"
import React from "react"

import TableDataUI from "@/components/table/TableDataUI.js"
import BaseTable from "@/components/table/BaseTable.js"
import TableDataFilters from "@/components/table/TableDataFilters"
import NavbarUI from "@/components/NavbarUI"
import BtnRedirect from "@/components/BtnRedirect"
import { ENDPOINT_API } from "@/utils/endpoints"
import dbTables from "@/utils/db_tables/tables"
import { useUser } from "@/app/userContext"
import { filterForRoles } from "@/utils/db_tables/tables"
import FilterField from "@/components/table/FilterField"
import { Suspense } from "react"


export default function Page() {
    const url = ENDPOINT_API?.ot_equipos_all
    const {user} = useUser()
    const role = user?.role || ""

    console.log("url",url);

    const {ot_equipos, ot_facturas, unidades_ot_equipos} = dbTables
    
    const fields = {...ot_equipos, ...ot_facturas, ...unidades_ot_equipos}
    const {n_ord_trabajo, empresa_socia, ruc } = fields

    return (
        <div>
        <Suspense fallback={<div>...</div>}>
           <BaseTable dataURL={url} fieldID={"n_ord_trabajo"}>
                
                <NavbarUI title={"OT Equipos"}>
                    <BtnRedirect href="/ot-personas/new">+ OT-Persona</BtnRedirect>
                    <BtnRedirect href="/ot-equipos/new">+ OT-Equipo</BtnRedirect>
                </NavbarUI>
                
                <TableDataFilters>
                    <FilterField config={n_ord_trabajo}/>
                    <FilterField config={empresa_socia}/>
                    <FilterField config={ruc}/>
                </TableDataFilters>

            <TableDataUI config={filterForRoles(fields, role)}></TableDataUI>

           </BaseTable>
        </Suspense>
        </div>
    )
}