"use client"
import React from "react"
import BaseForm from "@/components/form/BaseForm"
import FormGenerate from "@/components/form/FormGenerate"
import NavbarUI from "@/components/NavbarUI"
import FormSubmit from "@/components/form/FormSubmit"
import Link from "next/link"
import { PATH_FRONT } from "@/utils/endpoints"

import { ENDPOINT_API } from "@/utils/endpoints"
import dbTables from "@/utils/db_tables/tables"

export default function Page(){
    const {empresas} = dbTables
    
    return(
        <div>
            <Link className='ms-3' href={PATH_FRONT.empresas?.url}>
                ← Atrás
            </Link>
            <NavbarUI title={"Registro nueva Empresa"}></NavbarUI>
            <BaseForm method="post" sendDataUrl={ENDPOINT_API.empresas} >
                <FormGenerate fields={empresas}></FormGenerate>
                <FormSubmit></FormSubmit>
            </BaseForm>
        </div>
    )
}