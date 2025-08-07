import dbTables from "@/utils/db_tables/tables"
import { buildWhereClause, queryDBWhere} from "@/utils/db_tables/connect"


export async function GET(req){
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const { where, values } = buildWhereClause(searchParams);

    const {ot_facturas} = dbTables
    let data = await queryDBWhere(`SELECT ${Object.keys(ot_facturas)} FROM ot_facturas ${where} order by id`, values)
    
    data.formatFecha("fecha_factura")

    return Response.json(data)
}
