import { type } from "os";
import { ENDPOINT_API } from "../endpoints";

const admin= "admin"
const inspector = "inspector"
const contador = "contador"
const gerente = "gerente"
const all = [admin, inspector, contador, gerente]

const ot_personas = {
  id: {
    label: "ID",
    field: "id",
    roles: all
  },
  n_ord_trabajo: {
    label: "N° OT",
    field: "n_ord_trabajo",
    type: "text",
    roles: all
  },
  empresa_socia: {
    label: "Empresa",
    field: "empresa_socia",
    fieldData: "razon_social",
    type: "select",
    urlData: ENDPOINT_API.empresas,
    roles: all,
    async: "empresas",
    syncFields: ["ruc"]
  },
  ruc: {
    label: "RUC",
    field: "ruc",
    fieldData: "ruc",
    type: "select",
    roles: all,
    async: "empresas",
    syncFields: ["empresa_socia"],
  },
  empresa_certificadora: {
    label: "Certificadora",
    field: "empresa_certificadora",
    type: "select_default",
    options: ["OVERHAUL", "PREXA"],
    roles: all
  },
  nombre_curso: {
    label: "Curso",
    field: "nombre_curso",
    fieldData : "nombre_curso",
    type: "select",
    urlData: ENDPOINT_API.cursos,
    roles: all
  },
  nota: {
    label: "Nota",
    field: "nota",
    type: "number",
    roles: all
  },
  fecha_servicio: {
    label: "Fecha",
    field: "fecha_servicio",
    isDate: true,
    type: "date",
    roles: all
  },
  modalidad: {
    label: "Modalidad",
    field: "modalidad",
    type: "text",
    roles: all
  },
  instructor: {
    label: "Instructor",
    field: "instructor",
    type: "text",
    roles: all
  },
  nombres: {
    label: "Nombres",
    field: "nombres",
    type: "text",
    roles: all
  },
  apellidos: {
    label: "Apellidos",
    field: "apellidos",
    type: "text",
    roles: all
  },
  dni_alumno: {
    label: "DNI",
    field: "dni_alumno",
    type: "text",
    roles: all
  },
  n_veces: {
    label: "N° veces",
    field: "n_veces",
    type: "select_default",
    options : ["1","2","3"],
    roles: all
  },
  comentarios: {
    label: "Comentarios",
    field: "comentarios",
    type: "textarea",
    roles: all
  },
  flag_aprobatorio: {
    label: "Aprobó",
    field: "flag_aprobatorio",
    type: "checkbox",
    roles: all
  },
  proyecto: {
    label: "Proyecto",
    field: "proyecto",
    type: "text",
    roles: all
  },
  src_certificado:{
    label: "Certificado",
    field: "src_certificado",
    type: "file",
    roles: all
  }
};

const empresas = {
  id: {
    label: "N°",
    field: "id",
  },
  razon_social: {
    label: "Razon Social",
    field: "razon_social",
    type: "text"
  },
  ruc: {
    label: "RUC",
    field: "ruc",
    type: "text"
  },
  direccion: {
    label: "Direccion",
    field: "direccion",
    type: "text"
  },
}

const ot_equipos = {
  id: {
    label: "ID",
    field: "id",
    roles: all
  },
  n_ord_trabajo: {
    label: "N° OT",
    field: "n_ord_trabajo",
    roles: all
  },
  n_ord_servicio: {
    label: "N° OS",
    field: "n_ord_servicio",
    type: "text",
    roles: [contador]
  },
  n_cotizacion: {
    label: "N° cotización",
    type: "text",
    field: "n_cotizacion",
    roles: [contador]
  },
  empresa_socia: {
    label: "Empresa",
    field: "empresa_socia",
    fieldData: "razon_social",
    type: "select",
    urlData: ENDPOINT_API.empresas,
    roles: all,
    async: "empresas",
    syncFields: ["ruc"]
  },
  ruc: {
    label: "RUC",
    field: "ruc",
    fieldData: "ruc",
    type: "select",
    roles: all,
    async: "empresas",
    syncFields: ["empresa_socia"],
  },
  fecha_servicio: {
    label: "Fecha servicio",
    field: "fecha_servicio",
    isDate: true,
    type: "date",
    roles: all
  },
  empresa_certificadora: {
    label: "Certificadora",
    field: "empresa_certificadora",
    type: "select_default",
    options: ["OVERHAUL", "PREXA"],
    roles: all
  },
  lugar: {
    label: "Lugar",
    field: "lugar",
    type: "text",
    roles: all
  },
  descripcion_servicio: {
    label: "Descripción servicio",
    field: "descripcion_servicio",
    type: "textarea",
    roles: all
  },
  observaciones: {
    label: "Observaciones",
    field: "observaciones",
    type: "textarea",
    roles: all
  },
  comentarios: {
    label: "Comentarios",
    field: "comentarios",
    type: "textarea",
    roles: all
  }
};

const unidades_ot_equipos = {
  codigo: {
    label: "Código",
    field: "codigo",
  },
  id: {
    label: "ID",
    field: "id",
  },
  placa: {
    label: "Placa",
    field: "placa",
    type: "text"
  },
  area: {
    label: "Area",
    field: "area",
    type: "select_default",
    options : [
      'Faraday',
      'Izaje',
      'Manto IND',
      'NDT',
      'Soldadura',
      'Metro',
      'Calculo industrial',
      'Otros',
    ],
  },
    inspector: {
    label: "Inspector",
    field: "inspector",
    type: "text"
  },
  tipo_unidad: {
    label: "Tipo de unidad",
    field: "tipo_unidad",
    type: "select_default",
    options : [
      'Bombona',
      'Camión',
      'Carreta',
      'Cisterna de Combustible',
      'Compresores',
      'Gancho',
      'Grua Articulada',
      'Grua Pte',
      'Rigger',
      'Tracto'
    ]
  },
  src_certificado: {
    label: "Certificado",
    field: "src_certificado",
    type: "file"
  },
  src_informe_campo: {
    label: "Informe de campo",
    field: "src_informe_campo",
    type: "file"
  },
  src_informe_final: {
    label: "Informe final",
    field: "src_informe_final",
    type: "file"
  }
};

const ot_facturas = {
  id: {
    label: "N°",
    field: "id",
    roles: [gerente, contador],
    type : "hidden"
  },
  src_factura: {
    label: "Factura",
    field: "src_factura",
    type: "file",
    roles: [gerente, contador]
  },
  num_factura: {
    label: "N° factura",
    field: "num_factura",
    type: "text",
    roles: [gerente, contador]
  },
  monto_total: {
    label: "Monto total (S/.)",
    field: "monto_total",
    type: "number",
    roles: [gerente, contador]
  },
  detraccion: {
    label: "Detracción",
    field: "detraccion",
    type: "number",
    roles: [gerente, contador]
  },
  es_facturado: {
    label: "Facturado?",
    field: "es_facturado",
    type: "checkbox",
    roles: [gerente, contador]
  },
  es_pagado: {
    label: "Pagado?",
    field: "es_pagado",
    type: "checkbox",
    roles: [gerente, contador]
  },
  es_pago_detraccion: {
    label: "Pago detracción?",
    field: "es_pago_detraccion",
    type: "checkbox",
    roles: [gerente, contador]
  },
  monto_total_dolares: {
    label: "Monto total (US$)",
    field: "monto_total_dolares",
    type: "number",
    roles: [gerente, contador]
  },
  fecha_factura: {
    label: "Fecha factura",
    field: "fecha_factura",
    type: "date",
    roles: [gerente, contador]
  },
  sin_igv: {
    label: "Sin IGV",
    field: "sin_igv",
    type: "number",
    roles: [gerente, contador]
  },
  igv: {
    label: "IGV",
    field: "igv",
    type: "number",
    roles: [gerente, contador]
  },
  total_mas_igv: {
    label: "Total + IGV",
    field: "total_mas_igv",
    type: "number",
    roles: [gerente, contador]
  }
};
const compras = {
  id: {
    label: "N°",
    field: "id",
    roles: [gerente, contador],
    type : "hidden"
  },
  src_factura: {
    label: "Factura",
    field: "src_factura",
    type: "file",
    roles: [gerente, contador]
  },
  num_factura: {
    label: "N° factura",
    field: "num_factura",
    type: "text",
    roles: [gerente, contador]
  },
  monto_total: {
    label: "Monto total (S/.)",
    field: "monto_total",
    type: "number",
    roles: [gerente, contador]
  },
  detraccion: {
    label: "Detracción",
    field: "detraccion",
    type: "number",
    roles: [gerente, contador]
  },
  es_facturado: {
    label: "Facturado?",
    field: "es_facturado",
    type: "checkbox",
    roles: [gerente, contador]
  },
  es_pagado: {
    label: "Pagado?",
    field: "es_pagado",
    type: "checkbox",
    roles: [gerente, contador]
  },
  es_pago_detraccion: {
    label: "Pago detracción?",
    field: "es_pago_detraccion",
    type: "checkbox",
    roles: [gerente, contador]
  },
  monto_total_dolares: {
    label: "Monto total (US$)",
    field: "monto_total_dolares",
    type: "number",
    roles: [gerente, contador]
  },
  fecha_factura: {
    label: "Fecha factura",
    field: "fecha_factura",
    type: "date",
    roles: [gerente, contador]
  },
  sin_igv: {
    label: "Sin IGV",
    field: "sin_igv",
    type: "number",
    roles: [gerente, contador]
  },
  igv: {
    label: "IGV",
    field: "igv",
    type: "number",
    roles: [gerente, contador]
  },
  total_mas_igv: {
    label: "Total + IGV",
    field: "total_mas_igv",
    type: "number",
    roles: [gerente, contador]
  }
};

const facturas_unidades = {
  codigos_unidades: {
    label: "Unidades",
    field: "codigos_unidades",
    type: "multiselect",
    globalData : "codigos",
  },
}

const cursos = {
    id: {
      label: "N°",
      field: "id",
    },
    nombre_curso: {
      label: "Curso",
      field: "nombre_curso",
      type: "text"
    },
}

const alumnos = {
  nombres: {
    label: "Nombres",
    field: "nombres",
    type: "text"
  },
  apellidos: {
    label: "Apellidos",
    field: "apellidos",
    type: "text"
  },
  curso : {
    label : "Curso",
    field : "curso",
    type : "select_default",
    options : ["Matemáticas", "Inglés", "Comunicación"]
  }
}

const users ={
  id: {
    label: "N°",
    field: "id",
  },
  username: {
    label: "Usuario",
    field: "username",
    type: "text"
  },
  dni: {
    label: "DNI",
    field: "dni",
    type: "text"
  },
  telefono: {
    label: "Teléfono",
    field: "telefono",
    type: "text"
  },
  direccion: {
    label: "Dirección",
    field: "direccion",
    type: "text"
  },
  tipo_sangre: {
    label: "Tipo sangre",
    field: "tipo_sangre",
    type: "text"
  },
  role: {
    label: "Rol",
    field: "role",
    type: "select_default",
    options : ["admin","inspector","contador", "gerente"]
  },
  nombres: {
    label : "Nombres",
    field : "nombres",
    type: "text",
  },
  apellidos: {
    label : "Apellidos",
    field : "apellidos",
    type: "text",
  }
}

const user ={
  id: {
    label: "N°",
    field: "id",
  },
  username: {
    label: "Usuario",
    field: "username",
    type: "text"
  },
  dni: {
    label: "DNI",
    field: "dni",
    type: "text"
  },
  telefono: {
    label: "Teléfono",
    field: "telefono",
    type: "text"
  },
  direccion: {
    label: "Dirección",
    field: "direccion",
    type: "text"
  },
  tipo_sangre: {
    label: "Tipo sangre",
    field: "tipo_sangre",
    type: "text"
  },
  role: {
    label: "Rol",
    field: "role",
    type: "select_default",
    options : ["admin","inspector","contador", "gerente"]
  },
  password: {
    label: "Password",
    field: "password",
    type: "text",
  },
  nombres: {
    label : "Nombres",
    field : "nombres",
    type: "text",
  },
  apellidos: {
    label : "Apellidos",
    field : "apellidos",
    type: "text",
  }
}

function buildJoinedSelectFields(...tables) {
  return tables
    .flatMap(([alias, fields]) =>
      Object.keys(fields).map(field => `${alias}.${field}`)
    )
    .join(', ');
}

function cleanFields(fields) {
  const cleaned = {};

  for (const [key, value] of Object.entries(fields)) {
    if (value === "" || value === null || value === undefined) {
      continue;
    }

    // Archivos se agregan tal cual
    if (value instanceof File) {
      cleaned[key] = value;
      continue;
    }

    // Detectar fechas tipo string (formato yyyy-mm-dd o iso)
    if (
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(value) // formato simple YYYY-MM-DD
    ) {
      cleaned[key] = value;
      continue;
    }

    // Booleanos por texto
    if (value === "true") {
      cleaned[key] = true;
      continue;
    }

    if (value === "false") {
      cleaned[key] = false;
      continue;
    }

    // Convertir a número solo si no es fecha
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && isFinite(parsed) && typeof value !== "boolean") {
      cleaned[key] = parsed;
      continue;
    }

    // dejar como está
    cleaned[key] = value;
  }

  return cleaned;
}

function filterForRoles(objetoCampos, rolesUsuario = []) {
  const resultado = {};

  for (const [clave, valor] of Object.entries(objetoCampos)) {
    const rolesCampo = Array.isArray(valor.roles) ? valor.roles : [];

    const tieneAcceso = rolesCampo.some(rol => rolesUsuario.includes(rol));
    
    if (tieneAcceso) {
      resultado[clave] = valor;
    }
  }

  return resultado;
}

const dbTables = { ot_personas, ot_equipos, users, user, cursos, ot_facturas, empresas, unidades_ot_equipos, facturas_unidades, compras};
export default dbTables;

export { buildJoinedSelectFields, cleanFields, filterForRoles }
