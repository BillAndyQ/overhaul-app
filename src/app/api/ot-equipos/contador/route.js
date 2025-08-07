import dbTables, {buildJoinedSelectFields} from "@/utils/db_tables/tables"
import { queryDB} from "@/utils/db_tables/connect"

export async function GET() {
  const {ot_equipos, ot_facturas} = dbTables

  const columns = buildJoinedSelectFields(
    ["ot_equipos", ot_equipos],
    ["ot_facturas", ot_facturas]
  )

  const dataOTEquipos = await queryDB(`
    select ${columns} from ot_equipos 
      left join
      ot_facturas on
      ot_equipos.id_ord_trab = ot_facturas.id_ord_trab
      order by ot_equipos.id
      ;
    `)

  dataOTEquipos.formatFecha("fecha_servicio")

  return Response.json(dataOTEquipos)
}



