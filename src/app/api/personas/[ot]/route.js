import dbTables from "@/utils/db_tables/tables"
import { queryDB, insertIntoTable} from "@/utils/db_tables/connect"


export async function GET(request, context) {
  const { ot_personas } = dbTables;
  const { params } = context;

  const ot_per = params.ot;

  const columnas = Object.keys(ot_personas).join(", ");

  const data = await queryDB(
    `SELECT ${columnas} FROM ot_personas WHERE n_ord_trabajo='${ot_per}'`
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

export async function PUT(req, { params }) {
  let data, result

  try {
    data = await parseFormData(req);
  } catch (err) {
    console.error("❌ Error en parseFormData:", err);
    return NextResponse.json({ error: "Error al parsear el formulario" }, { status: 400 });
  }

  const { src_certificado, ...fieldsData } = data;

  const codeOT = params.ot;

  if (src_certificado) {
    try {
      result = await saveFile(src_certificado, codeOT);
      if (!result.success) {
        return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
      }
      fieldsData.src_certificado = result.path;
      console.log("path File",result.path);
      
    } catch (err) {
      console.error("❌ Error al guardar archivo:", err);
      return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
    }
  }

  // Aquí deberías actualizar en DB si tienes función ya:
  const resultPUT_OT = await updateTableById("ot_personas", fieldsData, "n_ord_trabajo", codeOT);

  return NextResponse.json({
    message: 'Actualización con éxito',
    archivo: result || null,
    ot_persona: resultPUT_OT, // solo si ya tienes update funcionando
  });
}

