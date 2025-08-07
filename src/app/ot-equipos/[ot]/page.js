"use client"

import BaseFormUpdate from "@/components/form/BaseFormUpdate"
import FormGenerate from "@/components/form/FormGenerate"
import FormSubmit from "@/components/form/FormSubmit"
import dbTables from "@/utils/db_tables/tables"
import NavbarUI from "@/components/NavbarUI"
import Link from "next/link"
import { useParams } from "next/navigation"
import FormTable from "@/components/form/FormTable"
import { PATH_FRONT, ENDPOINT_API } from "@/utils/endpoints"
import TableCell from "@/components/form/table/TableCell"
import {getData} from "@/utils/getData"
import { useEffect, useState } from "react"
import { useUser } from "@/app/userContext"
import { filterForRoles } from "@/utils/db_tables/tables"
import TableCellReadonly from "@/components/form/table/TableCellReadonly"
import FieldsAsync from "@/components/form/FieldsAsync"

export default function Page(){
    const {user} = useUser()
    const role = user?.role || ""

    const params = useParams();
    const ot = params.ot;
    const [codigos, setCodigos] = useState([])
    const {ot_equipos, unidades_ot_equipos, ot_facturas, facturas_unidades} = dbTables
    
    const {id, n_ord_trabajo, empresa_socia, ruc ,...fieldsOT } = filterForRoles(ot_equipos, role)
    
    useEffect(() => {
        getData(`${ENDPOINT_API.ot_equipos_all}/${ot}/codigos`)
            .then(setCodigos)
            .catch(console.error);
    }, [ot]);

    return(
        <div>
            <Link className='ms-3' href={PATH_FRONT.ot_equipos?.url}>
                ← Atrás
            </Link>
            <NavbarUI title={`N° ${ot} (OT Equipo)`}></NavbarUI>
            
            <BaseFormUpdate idData={ot} sendDataUrl={ENDPOINT_API.ot_equipos_all} getDataUrl={`${ENDPOINT_API.ot_equipos_all}/${ot}?file=true`}>
                <FieldsAsync configs={[empresa_socia, ruc]}></FieldsAsync>
                <FormGenerate fields={fieldsOT}></FormGenerate>
                
                {/* <FormTable nameTable="unidades" config={unidades}></FormTable> */}
                <TableCell config={unidades_ot_equipos} nameTable={"Unidades"} getDataUrl={`${ENDPOINT_API.ot_equipos_all}/${ot}/unidades`} sendDataUrl={`${ENDPOINT_API.ot_equipos_all}/${ot}/unidades`}>
                    
                </TableCell>

                {(role === 'contador') && (
                    <TableCell
                        globalData={{ codigos: codigos }}
                        config={{ ...facturas_unidades, ...ot_facturas }}
                        nameTable={"Facturas"}
                        getDataUrl={`${ENDPOINT_API.ot_equipos_all}/${ot}/facturas`}
                        sendDataUrl={`${ENDPOINT_API.ot_equipos_all}/${ot}/facturas`}
                    />
                )}
                
                {(role === 'gerente') && (
                    <TableCellReadonly
                        globalData={{ codigos: codigos }}
                        config={{ ...facturas_unidades, ...ot_facturas }}
                        nameTable={"Facturas"}
                        getDataUrl={`${ENDPOINT_API.ot_equipos_all}/${ot}/facturas`}
                    />
                )}
                
                <FormSubmit>Actualizar</FormSubmit>
            </BaseFormUpdate>
        </div>
    )
}