
export async function getData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;

  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error; // Puedes manejarlo arriba si lo usas en React
  }
}


export async function getDataBack(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Respuesta completa del backend:", data);
    
    return data;

  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return []; // no lances el error si ya lo controlas arriba
  }
}
