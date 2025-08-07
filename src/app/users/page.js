"use client"
import React from "react"
import BaseTable from "@/components/table/BaseTable"
import TableDataUI from "@/components/table/TableDataUI"
import TableDataFilters from "@/components/table/TableDataFilters"
import { ENDPOINT_API } from "@/utils/endpoints"
import dbTables from "@/utils/db_tables/tables"
import NavbarUI from "@/components/NavbarUI"
import BtnRedirect from "@/components/BtnRedirect"
import { Suspense } from "react"

export default function Page(){
    const {users} = dbTables
    
    return(
        <div>
            <Suspense fallback={<div>...</div>}>
            <NavbarUI title={"Usuarios"}>
                <BtnRedirect href="/users/new">+ Usuario</BtnRedirect>
            </NavbarUI>
            <BaseTable dataURL={ENDPOINT_API.users} fieldID={"id"}>
                <TableDataUI config={users}>
                </TableDataUI>
            </BaseTable>
            </Suspense>
        </div>
    )
}