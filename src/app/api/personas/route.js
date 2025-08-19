import dbTables from "@/utils/db_tables/tables"
import { queryDB, insertIntoTable, queryDBWhere, buildWhereClause} from "@/utils/db_tables/connect"
import { getUserFromToken } from "@/utils/auth/getUserFromToken";
import { buildJoinedSelectFields } from "@/utils/db_tables/tables";

export async function GET(req) {
  const user = await getUserFromToken(req);
  console.log( "user",user);
  const {ot_personas, ot_facturas} = dbTables
  const role = user?.role

  const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
  const { where, values } = buildWhereClause(searchParams);
    
  let result;

  const columns = buildJoinedSelectFields(
    ["ot_personas", ot_personas],
    ["ot_facturas", ot_facturas]
  )

  if(["contador", "gerente"].includes(role)){
    result = await queryDBWhere(`SELECT ${columns} FROM ot_personas left join
      ot_facturas on
      ot_facturas.id_ot_persona = ot_personas.id
      ${where}
      order by ot_personas.id`, values)
  }

  else if(["inspector","admin"].includes(role)){
    result = await queryDBWhere(`SELECT ${Object.keys(ot_personas)} FROM ot_personas ${where}
      order by id`, values)
  }
  
  result.formatFecha("fecha_servicio")

  return Response.json(result)
}

// src/app/api/personas/route.js
import { NextResponse } from 'next/server';
import { parseFormData } from "@/utils/db_tables/parseFormData"
import { saveFile } from "@/utils/db_tables/saveFile"
import { generateCodeOT } from "@/utils/generateCodeOT"

export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  try {
    const data = await parseFormData(req);

    const {src_certificado, ...fieldsData} = data

    const newOT = await queryDB('INSERT INTO ord_trab(removed_flag) VALUES (false) RETURNING id')
    const codeOT = generateCodeOT(newOT[0].id)
    console.log(data);

    let result = null
    
    if(src_certificado){
      result = await saveFile(src_certificado, codeOT);
      fieldsData.src_certificado = result.filename
      if (!result.success) {
        return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
      }
    }

    fieldsData.id_ord_trab = newOT[0].id
    fieldsData.n_ord_trabajo = codeOT

    const resultNewOT = await insertIntoTable('ot_personas', fieldsData);

    return NextResponse.json({
      message: 'Archivo subido y guardado',
      ot_persona : resultNewOT,
      archivo: result,
    });
    
  } catch (error) {
    console.error('❌ Error en POST /personas:', error);
    return NextResponse.json({ error: 'Falló el upload' }, { status: 500 });
  }
}