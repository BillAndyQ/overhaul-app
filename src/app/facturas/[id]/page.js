"use client"
import BaseFormUpdate from "@/components/form/BaseFormUpdate"
import FormSubmit from "@/components/form/FormSubmit"
import dbTables from "@/utils/db_tables/tables"
import Link from "next/link"
import { useParams } from "next/navigation"
import { PATH_FRONT, ENDPOINT_API } from "@/utils/endpoints"
import TableUnitCell from "@/components/form/table/TableUnitCell"

export default function Page(){
    const params = useParams();
    const id = params.id;
    const {ot_facturas} = dbTables
    console.log(id);
    
    return(
        <div>
            <Link className='ms-3' href={PATH_FRONT.facturas?.url}>
                ← Atrás
            </Link>

            <BaseFormUpdate>

                <TableUnitCell config={ot_facturas} nameTable={"Factura"} getDataUrl={`${ENDPOINT_API.facturas}/${id}`} sendDataUrl={`${ENDPOINT_API.facturas}/${id}`} key={id}></TableUnitCell>
                <FormSubmit>Actualizar</FormSubmit>
                
            </BaseFormUpdate>
        </div>
    )
}