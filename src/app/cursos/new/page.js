"use client"
import React from "react"
import BaseForm from '@/components/form/BaseForm';
import FormSubmit from '@/components/form/FormSubmit';
import FormSelect from '@/components/form/FormSelect';

import dbTables from "@/utils/db_tables/tables";
import FormGenerate from "@/components/form/FormGenerate";
import FormTextArea from "@/components/form/FormTextArea";
import Link from "next/link";
import { ENDPOINT_API } from "@/utils/endpoints";

export default function Page(){
    const {cursos} = dbTables

    return(
        <div>
            <BaseForm useFormData={false} method="post" sendDataUrl={ENDPOINT_API.cursos}>
                <Link href="/cursos">← Atrás</Link>

                <legend>Nuevo Curso</legend>
                 
                <FormGenerate fields={cursos}></FormGenerate>
                <FormSubmit></FormSubmit>

            </BaseForm>
        </div>
    )
}