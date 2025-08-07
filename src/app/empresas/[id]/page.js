"use client"
import BaseFormUpdate from "@/components/form/BaseFormUpdate"
import FormGenerate from "@/components/form/FormGenerate"
import FormSubmit from "@/components/form/FormSubmit"
import dbTables from "@/utils/db_tables/tables"
import NavbarUI from "@/components/NavbarUI"
import Link from "next/link"
import { useParams } from "next/navigation"
import { PATH_FRONT, ENDPOINT_API } from "@/utils/endpoints"
import TableCell from "@/components/form/table/TableCell"

export default function Page(){
    const params = useParams();
    const id = params.id;

    const {empresas} = dbTables
    
    return(
        <div>
            <Link className='ms-3' href={PATH_FRONT.empresas?.url}>
                ← Atrás
            </Link>
            {/* <NavbarUI title={`N° ${ot} (OT Equipo)`}></NavbarUI> */}
            
            <BaseFormUpdate idData={id} sendDataUrl={ENDPOINT_API.empresas} getDataUrl={`${ENDPOINT_API.empresas}/${id}`}>
                
                <FormGenerate fields={empresas}></FormGenerate>
                <FormSubmit>Actualizar</FormSubmit>
            </BaseFormUpdate>
        </div>
    )
}