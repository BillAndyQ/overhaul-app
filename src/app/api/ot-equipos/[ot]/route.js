import dbTables from "@/utils/db_tables/tables"
import { queryDB, insertIntoTable} from "@/utils/db_tables/connect"

export async function GET(request, context) {
  try {
    const { ot_equipos } = dbTables;

    const params = context && context.params ? context.params : {};
    const ot_eq = params.ot;

    if (!ot_eq) {
      return new Response("Parámetro 'ot' no especificado", { status: 400 });
    }

    const columnas = Object.keys(ot_equipos).join(", ");

    const equipo = await queryDB(
      `SELECT ${columnas} FROM ot_equipos WHERE n_ord_trabajo = '${ot_eq}'`,
    );

    if (!equipo || equipo.length === 0) {
      return new Response("No se encontró el equipo", { status: 404 });
    }

    equipo.formatFecha?.("fecha_servicio"); // Solo si la función está disponible

    const data = equipo[0];

    return Response.json({
      success: true,
      message: "Solicitud correcta",
      result: data,
    });

  } catch (error) {
    console.error("Error en GET /api/ot-equipos/[ot]:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import { parseFormData } from "@/utils/db_tables/parseFormData"
import { saveFile } from "@/utils/db_tables/saveFile"
import { updateTableById } from "@/utils/db_tables/connect";

export async function PUT(req, { params }) {
  try {
    let data, result
    data = await parseFormData(req);
    const { unidades, ...fieldsData } = data;
    const codeOT = params.ot;

    if (Object.keys(fieldsData).length > 0) {
      result = await updateTableById("ot_equipos", fieldsData, "n_ord_trabajo", codeOT);
    }

    if (unidades!=undefined) {
      console.log("unidades", unidades);
    }

    return NextResponse.json({
      message: 'Actualización con éxito',
      result
    });

  } catch (err) {
    console.error("❌ Error en parseFormData:", err);
    return NextResponse.json({ error: "Error al parsear el formulario" }, { status: 400 });
  }
}
