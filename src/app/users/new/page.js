"use client"
import React from "react"
import BaseForm from "@/components/form/BaseForm"
import FormGenerate from "@/components/form/FormGenerate"
import FormSubmit from "@/components/form/FormSubmit"
import { ENDPOINT_API } from "@/utils/endpoints"
import { PATH_FRONT } from "@/utils/endpoints"
import dbTables from "@/utils/db_tables/tables"
import Link from "next/link"

export default function Page(){
    const {user} = dbTables
    return(
        <div>
            
            <BaseForm sendDataUrl={ENDPOINT_API.register} method="post" urlRedirect={PATH_FRONT.users?.url}>
                <Link href="/users">← Atrás</Link>
                <legend>Nuevo usuario</legend>
                <FormGenerate fields={user}>
                </FormGenerate>
                
                <FormSubmit></FormSubmit>
            </BaseForm>

        </div>
    )
}