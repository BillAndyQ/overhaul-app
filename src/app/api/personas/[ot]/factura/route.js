import dbTables from "@/utils/db_tables/tables"
import { insertIntoTable, queryDB } from "@/utils/db_tables/connect"
import { buildJoinedSelectFields } from "@/utils/db_tables/tables";


export async function GET(request, { params }) {
  const { ot_facturas } = dbTables;

  const ot_per = params.ot;

    const columns = buildJoinedSelectFields(
        ["ot_facturas", ot_facturas]
    )

  const data = await queryDB(
    `SELECT ${columns} FROM ot_personas
    inner join ot_facturas
    on
    ot_facturas.id_ot_persona = ot_personas.id
    WHERE ot_personas.n_ord_trabajo='${ot_per}'`
  );

  return Response.json({
    success: true,
    message: "Solicitud Correcta",
    result: data[0]
  });
}

import { NextResponse } from 'next/server';
import { parseFormData } from "@/utils/db_tables/parseFormData"
import { saveFile } from "@/utils/db_tables/saveFile"
import { updateTableById } from "@/utils/db_tables/connect";
import { cleanFields } from "@/utils/db_tables/tables";

export async function PUT(req, context) {
  let data, result

  const { params } = context;
  const codeOT = params.ot;

  try {
    data = await parseFormData(req);
  } catch (err) {
    console.error("❌ Error en parseFormData:", err);
    return NextResponse.json({ error: "Error al parsear el formulario" }, { status: 400 });
  }

  let { src_factura, id, ...fieldsData } = data;
  console.log("FIELDS", fieldsData);
  const fields = cleanFields(fieldsData)
  console.log( "id_factura: ", id);
  
  // Insertar si no existe
  if(id == undefined){
    console.log("insertando nuevo");
    const ot_persona = await queryDB(`select id from ot_personas where n_ord_trabajo ='${codeOT}'`)
    console.log(ot_persona);
    
    const id_ot_persona = ot_persona[0]?.id
    console.log(fields);
    
    fields.id_ot_persona = id_ot_persona
    result = await insertIntoTable("ot_facturas", fields)
    id = result.data?.id
  }else{
    
    console.log("actualizando");
    result = await updateTableById("ot_facturas", fields, "id", id)
  }

  if (src_factura) {
      try {
        const factura = await saveFile(src_factura, `FACTURA-${id}-${codeOT}`, `public/uploads/${codeOT}/facturas/${id}`);
        if (!factura.success) {
          return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
        }

        fieldsData.src_factura = factura.path;

      } catch (err) {
        console.error("❌ Error al guardar archivo:", err);
        return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
      }
  }

  console.log(fieldsData);

  if(Object.keys(fieldsData).length !== 0){
    result = await updateTableById("ot_facturas",fieldsData, "id", id)
  }

  return NextResponse.json({
    message: 'Actualización con éxito',
    result
  });
}

