import dbTables from "@/utils/db_tables/tables"
import { buildWhereClause, queryDB, updateTableById} from "@/utils/db_tables/connect"


export async function GET(req, {params}){
    const idFactura = params.id;
    
    const {ot_facturas} = dbTables
    
    let data = await queryDB(`SELECT ${Object.keys(ot_facturas)} FROM ot_facturas where id=${idFactura}`)
    
    data.formatFecha("fecha_factura")

    return Response.json({
    success: true,
    message: "Solicitud Correcta",
    result: data[0]
  });
}
import { NextResponse } from "next/server";
import { parseFormData } from "@/utils/db_tables/parseFormData";

export async function PUT(req, {params}){
    const idFactura = params.id;
    let data;
    try {
        data = await parseFormData(req);
      } catch (err) {
        console.error("❌ Error en parseFormData:", err);
        return NextResponse.json({ error: "Error al parsear el formulario" }, { status: 400 });
      }

    let { src_factura, id, ...fieldsData } = data;


    let result = await updateTableById("ot_facturas", fieldsData,"id", idFactura)


    return Response.json({
        success: true,
        result
    })
}