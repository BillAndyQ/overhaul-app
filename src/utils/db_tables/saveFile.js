import fs from 'fs/promises';
import path from 'path';

export async function saveFile(file, newName = null, destFolder = './public/uploads') {
  try {
    // Asegura que el destino exista
    await fs.mkdir(destFolder, { recursive: true });

    // Extrae la extensión original del archivo
    const originalExt = path.extname(file.originalFilename || '');
    
    // Si se pasa un nuevo nombre, le agrega la extensión si no la tiene
    const finalName = newName
      ? path.extname(newName) ? newName : newName + originalExt
      : file.originalFilename;

    const newFilePath = path.join(destFolder, finalName);

    // Mueve el archivo desde su ubicación temporal
    await fs.rename(file.filepath, newFilePath);

    return {
      success: true,
      path: newFilePath,
      filename: finalName,
    };
  } catch (error) {
    console.error('❌ Error al guardar archivo:', error);
    return {
      success: false,
      error,
    };
  }
}
