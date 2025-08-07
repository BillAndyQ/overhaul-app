import db from '@/app/lib/db';

async function queryDB(query_string) {
  try {
    const result = await db.query(query_string);
    return new BaseModel(...result.rows); 
  } catch (err) {
    console.error('❌ Error en queryDB:', err.message);
    return {
      success: false,
      error: err
    };
  }
}

export async function queryDBComplete(queryText, params = []) {
  try {
    // Ejecutar la consulta con parámetros
    const result = await db.query(queryText, params);

    // Transformar cada fila en una instancia de BaseModel
    const models = result.rows.map(row => new BaseModel(row));

    // Devolver el arreglo de instancias de BaseModel
    return models;
  } catch (err) {
    // Registrar el error con detalles
    console.error('❌ Error en queryDB:', {
      query: queryText,
      params,
      error: err.message,
      stack: err.stack,
    });
    throw new Error(`Error al ejecutar consulta: ${err.message}`);
  }
}

async function queryDBWhere(query_string, values = []) {
  try {
    const result = values.length
      ? await db.query(query_string, values)
      : await db.query(query_string);

    return new BaseModel(...result.rows);
  } catch (err) {
    console.error('❌ Error en queryDB:', err.message);
    return {
      success: false,
      error: err
    };
  }
}

function buildWhereClause(params) {
  const keys = Object.keys(params).filter(
    (key) => params[key] !== undefined && params[key] !== ''
  );

  if (keys.length === 0) return { where: '', values: [] };

  const conditions = keys.map((key, index) => {
    return `${key} ILIKE $${index + 1}`;
  });

  const values = keys.map((key) => `%${params[key]}%`);

  return {
    where: `WHERE ${conditions.join(' AND ')}`,
    values,
  };
}

export async function insertIntoTable(tableName, data) {
  const sanitizedData = { ...data };

  for (const [key, value] of Object.entries(sanitizedData)) {
    if (value instanceof Date) {
      // convierte Date a YYYY-MM-DD
      sanitizedData[key] = value.toISOString().slice(0, 10);
    } else if (
      typeof value === 'string' &&
      /^\d{4}-\d{2}-\d{2}T/.test(value)
    ) {
      // si es un string tipo ISO con hora, recorta
      sanitizedData[key] = value.slice(0, 10);
    }
  }

  const keys = Object.keys(sanitizedData);
  const values = Object.values(sanitizedData);
  const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(', ');

  const query = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;

  try {
    const result = await db.query(query, values);
    return {
      success: true,
      data: result.rows[0],
    };
  } catch (err) {
    console.error('❌ Error al insertar en tabla:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

export async function updateTableById(tableName, data, idField = 'id', valueidField) {
  if (!tableName || typeof tableName !== 'string') {
    return { success: false, error: 'Nombre de tabla inválido' };
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { success: false, error: 'Datos inválidos para actualizar' };
  }

  if (!valueidField) {
    return { success: false, error: 'Valor de ID no proporcionado' };
  }

  // Limpieza de campos vacíos
  const cleanedData = {};
  for (const [key, value] of Object.entries(data)) {
    if (key !== idField) {
      cleanedData[key] = value === '' ? null : value;
    }
  }

  const keys = Object.keys(cleanedData);
  const values = keys.map(key => cleanedData[key]);
  const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');

  const idParamIndex = keys.length + 1; // posición del id en el array

  const query = `UPDATE ${tableName} SET ${setClause} WHERE ${idField} = $${idParamIndex} RETURNING *`;
  console.log(query);

  try {
    const result = await db.query(query, [...values, valueidField]);
    return {
      success: true,
      data: result.rows[0],
    };
  } catch (err) {
    console.error('❌ Error al actualizar en tabla:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

class BaseModel extends Array {
  
  toLowerCase(field) {
    this.forEach(obj => {
      if (obj[field]) {
        obj[field] = obj[field].toLowerCase();
      }
    });
  }

  formatFecha(field, targetField = field) {
    this.forEach(obj => {
      const value = obj[field];
      if (value) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          obj[targetField] = `${day}-${month}-${year}`;
        }
      }
    });
  }
}

function selectColumns(objetoOriginal, valores) {
  const entradasFiltradas = Object.entries(objetoOriginal).filter(
    ([_, value]) => valores.includes(value)
  );
  return Object.fromEntries(entradasFiltradas);
}

export { selectColumns, queryDB, queryDBWhere, buildWhereClause};
