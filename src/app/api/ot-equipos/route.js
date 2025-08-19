import dbTables, {buildJoinedSelectFields} from "@/utils/db_tables/tables"
import { queryDB, queryDBWhere,buildWhereClause } from "@/utils/db_tables/connect"
import { getUserFromToken } from "@/utils/auth/getUserFromToken";
import { filterForRoles } from "@/utils/db_tables/tables";

export async function GET(req) {
  const {ot_equipos, ot_facturas} = dbTables
  let result;
  const user = await getUserFromToken(req);

  const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
  const { where, values } = buildWhereClause(searchParams);
  console.log("where", where);
  
  const role = user?.role

  const columns = buildJoinedSelectFields(
    ["ot_equipos", ot_equipos],
    ["ot_facturas", ot_facturas]
  )
  
  if(["contador", "gerente"].includes(role)){
    result = await queryDBWhere(`
    select ${columns} from ot_equipos 
      left join
      ot_facturas on
      ot_equipos.id = ot_facturas.id_ot_equipos
      ${where}
      order by ot_equipos.id
      ;
    `, values)
  result.formatFecha("fecha_factura")
  }
  else if(["admin", "inspector"].includes(role)){
    result = await queryDBWhere(`
    select ${Object.keys(filterForRoles(ot_equipos, ["admin", "inspector"]))} from ot_equipos ${where}
      order by id
      ;
    `, values)
  }

  result.formatFecha("fecha_servicio")

  return Response.json(result)
}

import { insertIntoTable } from "@/utils/db_tables/connect"
import { NextResponse } from "next/server"
import { parseFormData } from "@/utils/db_tables/parseFormData"

export async function POST(request){

  let data, result;
  console.log(request);
  
  try {
      data = await parseFormData(request);
      console.log(data);
      result = await insertIntoTable("ot_equipos",data)

  } catch (err) {
    console.error("❌ Error en parseFormData:", err);
    return NextResponse.json({ error: "Error al parsear el formulario" }, { status: 400 });
  }
  return NextResponse.json({
      message: 'OT EQUIPO registrado con éxito',
      result,
    });
}

