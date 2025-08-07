

export function generateCodeOT(id) {
  const now = new Date();

  const mes = String(now.getMonth() + 1).padStart(2, '0'); // Mes en formato 01–12
  const año = now.getFullYear();

  const idFormatted = String(id).padStart(6, '0'); // Completa el ID con ceros a la izquierda

  return `OM-${mes}-${año}-${idFormatted}`;
}
