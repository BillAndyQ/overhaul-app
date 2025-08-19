import dbTables from "@/utils/db_tables/tables"
import {queryDB} from "@/utils/db_tables/connect"

export async function GET(request, context) {
  const params = await context.params; 
  const { ot_equipos, unidades_ot_equipos } = dbTables;
  
  const ot_eq = await params.ot;
  
  const equipo = await queryDB(
    `SELECT id FROM ot_equipos WHERE n_ord_trabajo='${ot_eq}'`
  );
  
  const idOT = equipo[0].id
  
  const result = await queryDB(
    `SELECT codigo FROM unidades_ot_equipos WHERE id_ot_equipos='${idOT}' order by id`
  );
  
  const codigos = result.map((codigo)=>codigo.codigo)
  
  return Response.json({
    success: true,
    message: "Solicitud Correcta",
    result : codigos
  });
}
