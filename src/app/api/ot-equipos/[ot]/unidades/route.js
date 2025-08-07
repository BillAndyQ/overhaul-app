import dbTables from "@/utils/db_tables/tables"
import { insertIntoTable, queryDB, updateTableById} from "@/utils/db_tables/connect"
import { saveFile } from "@/utils/db_tables/saveFile"

export async function GET(request, context) {
  const { params } = context;
  const { ot_equipos, unidades_ot_equipos } = dbTables;
  
  const ot_per = params.ot;
  console.log(ot_per);
  
  //  const columnas = Object.keys(ot_equipos).join(", ");
  
  const equipo = await queryDB(
    `SELECT id FROM ot_equipos WHERE n_ord_trabajo='${ot_per}'`
  );

  //  equipo.formatFecha("fecha_servicio");
  const idOT = equipo[0].id
  
  const unidades = await queryDB(
    `SELECT ${Object.keys(unidades_ot_equipos)} FROM unidades_ot_equipos WHERE id_ot_equipos='${idOT}' order by id`
  );
  
  return Response.json({
    success: true,
    message: "Solicitud Correcta",
    result : unidades
  });
}

import { parseFormData } from "@/utils/db_tables/parseFormData"
import { NextResponse } from 'next/server';

export async function PUT(req, context){
  const { params } = context;
  const codeOT = params.ot;
  let codigo;
  
  const data = await parseFormData(req);
  let { src_certificado, id, src_informe_final, src_informe_campo, ...fieldsData } = data;
  let result;

  console.log("ID unidad", id, " Cantidad:", Object.keys(fieldsData).length);
  
  if(id != "" && Object.keys(fieldsData).length !== 0){
    result = await updateTableById("unidades_ot_equipos",fieldsData, "id", id)
    codigo = result[0]?.codigo;
    console.log("actualizando...");
    
  }else if(Object.keys(fieldsData).length !== 0){
    console.log("insertando");
    const equipo = await queryDB(`SELECT id from ot_equipos where n_ord_trabajo='${codeOT}'`)
    const id_equipo = equipo[0]?.id
    console.log("ID EQUIPO: ",id_equipo);
    fieldsData.id_ot_equipos = id_equipo
    result = await insertIntoTable("unidades_ot_equipos", fieldsData)
    codigo = result[0]?.codigo;
  }
  else{
    console.log("codigo");
    const equipo = await queryDB(`SELECT codigo from unidades_ot_equipos where id='${id}'`)
    codigo = equipo[0]?.codigo;
  }

  console.log("fields",fieldsData);
  console.log(result);
  
  if (src_certificado) {
      try {
        const certificado = await saveFile(src_certificado, "certificado", `public/uploads/${codeOT}/${codigo}`);
        if (!certificado.success) {
          return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
        }
        fieldsData.src_certificado = certificado.path;
      } catch (err) {
        console.error("❌ Error al guardar archivo:", err);
        return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
      }
  }

  if (src_informe_campo) {
      try {
        const file = await saveFile(src_informe_campo, "informe_campo", `public/uploads/${codeOT}/${codigo}`);
        if (!file.success) {
          return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
        }
        fieldsData.src_informe_campo = file.path;
      } catch (err) {
        console.error("❌ Error al guardar archivo:", err);
        return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
      }
  }

  if (src_informe_final) {
      try {
        const file = await saveFile(src_informe_final, "informe_final", `public/uploads/${codeOT}/${codigo}`);
        if (!file.success) {
          return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
        }
        fieldsData.src_informe_final = file.path;
      } catch (err) {
        console.error("❌ Error al guardar archivo:", err);
        return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
      }
  }
  
  if(Object.keys(fieldsData).length !== 0){
    result = await updateTableById("unidades_ot_equipos",fieldsData, "id", id)
  }
  
  return NextResponse.json({
    message: 'Actualización con éxito',
    result
  });

}