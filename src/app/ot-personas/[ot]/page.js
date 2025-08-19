'use client';
import { useParams } from 'next/navigation';
import BaseFormUpdate from '@/components/form/BaseFormUpdate';
import NavbarUI from '@/components/NavbarUI';
import dbTables from '@/utils/db_tables/tables';
import FormGenerate from '@/components/form/FormGenerate';
import Link from 'next/link';
import FormSubmit from '@/components/form/FormSubmit';
import FormFile from "@/components/form/FormFile";
import { ENDPOINT_API, PATH_FRONT } from '@/utils/endpoints';
import { useUser } from "@/app/userContext"
import TableCell from '@/components/form/table/TableCell';
import TableUnitCell from '@/components/form/table/TableUnitCell';
import TableCellReadonly from '@/components/form/table/TableCellReadonly';
import FieldsAsync from '@/components/form/FieldsAsync';


export default function Page() {
    const {ot_personas, ot_facturas} = dbTables

    const {id, n_ord_trabajo, empresa_socia, ruc, ...fieldsOT} = ot_personas
    const params = useParams();
    const ot = params.ot;

    const {user} = useUser()
    const role = user?.role || ""
    
    return(
        <div>
            <Link className='ms-3' href={PATH_FRONT.ot_personas?.url}>
                ← Atrás
            </Link>
            <NavbarUI title={`N° ${ot} (OT Persona)`}>
            </NavbarUI>
            <BaseFormUpdate sendDataUrl={ENDPOINT_API.ot_personas} idData={ot} getDataUrl={`${ENDPOINT_API.ot_personas}/${ot}?file=true`}>
                
                {/* <TableCell
                    config={ot_personas}
                    limitRows = {1}
                    nameTable={"Persona"}
                    getDataUrl={`${ENDPOINT_API.ot_personas}/${ot}`}
                    sendDataUrl={`${ENDPOINT_API.ot_personas}/${ot}`}
                /> */}
                <FieldsAsync configs={[empresa_socia, ruc]}></FieldsAsync>
                
                <FormGenerate fields={fieldsOT}></FormGenerate>
                <FormFile label={"Certificado"} name={"src_certificado"}></FormFile>
                    
                {(role === 'contador') && (
                    <TableUnitCell
                        config={ot_facturas}
                        nameTable={"Facturas"}
                        getDataUrl={`${ENDPOINT_API.ot_personas}/${ot}/factura`}
                        sendDataUrl={`${ENDPOINT_API.ot_personas}/${ot}/factura`}
                    />
                )}
                {(role === 'gerente') && (
                    <TableCellReadonly
                        config={ot_facturas}
                        nameTable={"Facturas"}
                        getDataUrl={`${ENDPOINT_API.ot_personas}/${ot}/factura`}
                    />
                )}

                <FormSubmit>Actualizar</FormSubmit>
            </BaseFormUpdate>
        </div>
    );
}
