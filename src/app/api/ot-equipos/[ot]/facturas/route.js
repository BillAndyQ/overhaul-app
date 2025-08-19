import dbTables from "@/utils/db_tables/tables"
import { insertIntoTable, queryDB, updateTableById, queryDBComplete} from "@/utils/db_tables/connect"
import { saveFile } from "@/utils/db_tables/saveFile"
import { buildJoinedSelectFields } from "@/utils/db_tables/tables";
import { cleanFields } from "@/utils/db_tables/tables";

export async function GET(request, context) {
  const params = await context.params; 
  const ot_eq = params.ot;


  const { ot_facturas } = dbTables;
  
  console.log(ot_eq);

  const columns = buildJoinedSelectFields(
    ["ot_facturas", ot_facturas]
  )

  //  const columnas = Object.keys(ot_equipos).join(", ");
  
  const equipo = await queryDB(
    `SELECT id FROM ot_equipos WHERE n_ord_trabajo='${ot_eq}'`
  );

  //  equipo.formatFecha("fecha_servicio");
  const idOT = equipo[0].id
  
  const facturas = await queryDB(
    `
    SELECT 
      ${columns},
      ARRAY_AGG(u_ot.codigo ORDER BY u_ot.codigo) AS codigos_unidades
    
    FROM facturas_unidades_ot_equipos AS u_ot_fac
    RIGHT JOIN ot_facturas ON u_ot_fac.id_ot_factura = ot_facturas.id
    LEFT JOIN unidades_ot_equipos AS u_ot ON u_ot.id = u_ot_fac.id_unidad_ot_equipo

    WHERE ot_facturas.id_ot_equipos = ${idOT}
    GROUP BY ${columns};
    `
  );
  
  return Response.json({
    success: true,
    message: "Solicitud Correcta",
    result : facturas
  });
}

import { parseFormData } from "@/utils/db_tables/parseFormData"
import { NextResponse } from 'next/server';

export async function PUT(req, context){
  const params = await context.params; 

  const codeOT = params.ot;
  
  const data = await parseFormData(req);
  let { codigos_unidades, id, src_factura, ...fieldsData } = data;
  let result;
  let id_fact;

  if(id.length != 0 && Object.keys(fieldsData).length !== 0){
    result = await updateTableById("ot_facturas",fieldsData, "id", id)
    console.log("actualizando...");

  }else if(id.length == 0){
    console.log("Insertando");
    const equipo = await queryDB(`select id from ot_equipos where n_ord_trabajo='${codeOT}'`)
    fieldsData.id_ot_equipos = equipo[0]?.id
    id = equipo[0]?.id
    result = await insertIntoTable("ot_facturas", cleanFields(fieldsData))
    id_fact = result.id
  }

  if(codigos_unidades != undefined && id.length !=0){
    const id_fac = id
    console.log("codigos unidades: ",codigos_unidades, "factura", id_fac);

    result = await queryDB(`
      SELECT * FROM verificar_unidades_factura(
          '${codigos_unidades}',
          ${id_fac}
      );
      `)
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
  
  if(Object.keys(fieldsData).length !== 0){
    result = await updateTableById("ot_facturas",fieldsData, "id", id)
  }
  
  return NextResponse.json({
    message: 'Actualización con éxito',
    result
  });

}


// export async function PUT(req,  { params }) {
//   try {
//     const { ot: codeOT } = await params;

//     // Validar codeOT
//     if (typeof codeOT !== 'string' || codeOT.trim() === '') {
//       return NextResponse.json({ error: 'Código OT inválido' }, { status: 400 });
//     }

//     const data = await parseFormData(req);
//     let { codigos_unidades, id, src_factura, ...fieldsData } = data;
//     let result;

//     // Validar id
//     if (typeof id !== 'string' || id.trim() === '') {
//       id = null; // Normalizar id para inserciones
//     }

//     // Validar fieldsData
//     if (!fieldsData || typeof fieldsData !== 'object') {
//       return NextResponse.json({ error: 'Datos de formulario inválidos' }, { status: 400 });
//     }

//     // Manejo de inserción o actualización
//     if (!id) {
//       // Inserción
//       try {
//         const id_eq = await queryDBComplete('SELECT id FROM ot_equipos WHERE n_ord_trabajo = $1', [codeOT]);
//         if (!id_eq[0]?.id) {
//           return NextResponse.json({ error: 'No se encontró equipo para el OT' }, { status: 404 });
//         }

//         fieldsData.id_ot_equipos = id_eq[0].id;
//         id = id_eq[0].id;
//         result = await insertIntoTable('ot_facturas', cleanFields(fieldsData));
//         console.log('Insertando factura:', { id, fieldsData });
//       } catch (err) {
//         console.error('Error al insertar en ot_facturas:', err);
//         return NextResponse.json({ error: 'Error al insertar factura' }, { status: 500 });
//       }
//     } else {
//       // Actualización inicial si hay datos
//       if (Object.keys(fieldsData).length > 0) {
//         try {
//           result = await updateTableById('ot_facturas', fieldsData, 'id', id);
//           console.log('Actualizando factura:', { id, fieldsData });
//         } catch (err) {
//           console.error('Error al actualizar ot_facturas:', err);
//           return NextResponse.json({ error: 'Error al actualizar factura' }, { status: 500 });
//         }
//       }
//     }

//     // Manejo de codigos_unidades
//     if (codigos_unidades && id) {
//       if (typeof codigos_unidades !== 'string' || codigos_unidades.trim() === '') {
//         return NextResponse.json({ error: 'Códigos de unidades inválidos' }, { status: 400 });
//       }

//       try {
//         result = await queryDB(
//           'SELECT * FROM verificar_unidades_factura($1, $2)',
//           [codigos_unidades, id]
//         );
//         console.log('Verificando unidades:', { codigos_unidades, id_fac: id });
//       } catch (err) {
//         console.error('Error al verificar unidades:', err);
//         return NextResponse.json({ error: 'Error al verificar unidades' }, { status: 500 });
//       }
//     }

//     // Manejo de archivo
//     if (src_factura) {
//       try {
//         // Asegurar que el directorio existe
//         const uploadDir = `public/uploads/${codeOT}/facturas/${id}`;
//         mkdirSync(uploadDir, { recursive: true });

//         const factura = await saveFile(src_factura, `FACTURA-${id}-${codeOT}`, uploadDir);
//         if (!factura.success) {
//           return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
//         }

//         fieldsData.src_factura = factura.path;
//         console.log('Archivo guardado:', factura.path);
//       } catch (err) {
//         console.error('Error al guardar archivo:', err);
//         return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
//       }
//     }

//     // Actualización final si hay cambios en fieldsData (incluyendo src_factura)
//     if (Object.keys(fieldsData).length > 0 && id) {
//       try {
//         result = await updateTableById('ot_facturas', fieldsData, 'id', id);
//         console.log('Actualización final de factura:', { id, fieldsData });
//       } catch (err) {
//         console.error('Error en actualización final de ot_facturas:', err);
//         return NextResponse.json({ error: 'Error al actualizar factura' }, { status: 500 });
//       }
//     }

//     return NextResponse.json({
//       message: id ? 'Actualización exitosa' : 'Inserción exitosa',
//       result,
//       id
//     }, { status: 200 });

//   } catch (err) {
//     console.error('Error en PUT:', err);
//     return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
//   }
// }