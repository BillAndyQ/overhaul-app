import { queryDB } from "@/utils/db_tables/connect";
import dbTables from "@/utils/db_tables/tables";

export async function GET(request, { params }) {
  const { empresas } = dbTables;

  const idItem = params.id;

  const columnas = Object.keys(empresas).join(", ");

  const data = await queryDB(
    `SELECT ${columnas} FROM empresas WHERE id='${idItem}'`
  );
  
  return Response.json({
    success: true,
    message: "Solicitud Correcta",
    result: data[0]
  });
}

import { NextResponse } from "next/server";
import { updateTableById } from "@/utils/db_tables/connect";
import { parseFormData } from "@/utils/db_tables/parseFormData";

export async function PUT(request, {params}){
  let data, result

  const id = params.id;
  
  try {
      data = await parseFormData(request);
  } catch (err) {
    console.error("❌ Error en parseFormData:", err);
    return NextResponse.json({ error: "Error al parsear el formulario" }, { status: 400 });
  }

  result = await updateTableById("empresas", data, "id", id);

  return NextResponse.json({
    message: 'Actualización con éxito',
    result
  });
}