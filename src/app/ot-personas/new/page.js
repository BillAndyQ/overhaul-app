"use client"
import React from "react"
import BaseForm from '@/components/form/BaseForm';
import FormSubmit from '@/components/form/FormSubmit';
import FormSelect from '@/components/form/FormSelect';

import dbTables from "@/utils/db_tables/tables";
import FormFile from "@/components/form/FormFile";
import FormGenerate from "@/components/form/FormGenerate";
import FormTextArea from "@/components/form/FormTextArea";
import Link from "next/link";
import { ENDPOINT_API, PATH_FRONT } from "@/utils/endpoints";
import FieldsAsync from "@/components/form/FieldsAsync";

export default function Page(){
    const {ot_personas} = dbTables
    const {id, n_ord_trabajo, empresa_socia, ruc ,proyecto,...rest} = ot_personas

    return(
        <div>
            <BaseForm useFormData={true} sendDataUrl={ENDPOINT_API.ot_personas} urlRedirect={PATH_FRONT.ot_personas.url}>
                <Link href="/ot-personas">← Atrás</Link>

                <legend>Nueva OT Persona</legend>
                <FieldsAsync configs={[empresa_socia, ruc]}></FieldsAsync>
                 
                <FormGenerate fields={rest}></FormGenerate>

                <FormSelect name={"proyecto"} label="Proyecto">
                    <option value={"Antamina"}>Antamina</option>
                    <option value={"Multitrac"}>Multitrac</option>
                </FormSelect>
                <FormTextArea name={"comentarios"} label={"Comentarios"}></FormTextArea>

                {/* <FormSelectExt dataUrl={"http://localhost:3000/api/cursos"} name={"nombre_curso"} labelField={"Curso"} fieldData="nombre_curso"></FormSelectExt> */}
                
                <FormFile name={"src_certificado"} label={"Certificado"}></FormFile>
                <FormSubmit></FormSubmit>

            </BaseForm>
        </div>
    )
}