"use client"
import dbTables from "@/utils/db_tables/tables"
import BaseForm from "@/components/form/BaseForm"
import FormGenerate from "@/components/form/FormGenerate"
import { ENDPOINT_API, PATH_FRONT } from "@/utils/endpoints"
import FormSubmit from "@/components/form/FormSubmit"
import Link from "next/link"
import { useUser } from "@/app/userContext"
import { filterForRoles } from "@/utils/db_tables/tables"
import FieldsAsync from "@/components/form/FieldsAsync"

export default function Page(){
    const {ot_equipos} = dbTables
    const {user} = useUser()
    const role = user?.role || ""
    const {empresa_socia, ruc, ...fields} = ot_equipos

    return(
        <div>
            <BaseForm sendDataUrl={ENDPOINT_API.ot_equipos?.admin} urlRedirect={PATH_FRONT.ot_equipos.url}  idUrlRedirect="" useFormData={true}>
            <Link className='' href={PATH_FRONT.ot_equipos?.url}>
                ← Atrás
            </Link>
                <legend>Nueva OT (Equipos)</legend>
                <FieldsAsync configs={[empresa_socia, ruc]}></FieldsAsync>
                
                <FormGenerate fields={filterForRoles(fields, role)}></FormGenerate>
                <FormSubmit></FormSubmit>
            </BaseForm>
        </div>
    )
}