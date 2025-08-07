"use client"
import React from "react"
import BaseTable from "@/components/table/BaseTable"
import TableDataUI from "@/components/table/TableDataUI"
import TableDataFilters from "@/components/table/TableDataFilters"
import { ENDPOINT_API } from "@/utils/endpoints"
import dbTables from "@/utils/db_tables/tables"
import TableField from "@/components/table/TableField"
import NavbarUI from "@/components/NavbarUI"
import BtnRedirect from "@/components/BtnRedirect"
import { Suspense } from "react"

export default function Page(){
    const {cursos} = dbTables
    return(
        <div>
        <Suspense fallback={<div>...</div>}>
            <NavbarUI title={"Cursos"}>
                <BtnRedirect href="/cursos/new">+ Curso</BtnRedirect>
            </NavbarUI>

            <BaseTable dataURL={ENDPOINT_API.cursos} fieldID={"id"}>
                <TableDataFilters>
                    <TableField name={"Nombre"}/>
                    <TableField name={"Email"}/>
                </TableDataFilters>

                <TableDataUI config={cursos} >
                    
                </TableDataUI>
            </BaseTable>
        </Suspense>
        </div>
    )
}