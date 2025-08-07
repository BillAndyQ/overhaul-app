import dbTables from "@/utils/db_tables/tables"
import { queryDB} from "@/utils/db_tables/connect"
import { insertIntoTable } from "@/utils/db_tables/connect"

export async function GET(){
    const {cursos} = dbTables
    const dataCursos = await queryDB(`SELECT ${Object.keys(cursos)} FROM cursos`, cursos)

    // dataCursos.toLowerCase("nombre_curso");

    return Response.json(dataCursos)
}

export async function POST(request) {
    const body = await request.json(); // <- Aquí obtienes los datos enviados
    console.log(body);
    
    const data = await insertIntoTable("cursos", body); // <- body ya es un objeto con las claves y valores
    
    return Response.json(data);
}
