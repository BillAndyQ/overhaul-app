import dbTables from "@/utils/db_tables/tables"
import { queryDB, queryDBWhere, buildWhereClause} from "@/utils/db_tables/connect"
import { insertIntoTable } from "@/utils/db_tables/connect"

export async function GET(req){
    const {empresas} = dbTables
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const { where, values } = buildWhereClause(searchParams);

    const data = await queryDBWhere(`SELECT ${Object.keys(empresas)} FROM empresas ${where} order by id`, values)
    

    return Response.json(data)
}

export async function POST(request) {
    const body = await request.json(); // <- Aquí obtienes los datos enviados
    console.log(body);
    
    const data = await insertIntoTable("empresas", body); // <- body ya es un objeto con las claves y valores

    return Response.json(data);
}
