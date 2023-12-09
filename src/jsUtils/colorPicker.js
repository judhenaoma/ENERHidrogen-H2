function generarGradienteColores(cantidad) {
    // Definir colores extremos
    const colorVerde = [0, 128, 0];    // Verde
    const colorRojo = [255, 0, 0];      // Rojo
  
    // Inicializar lista de colores
    const colores = [];
  
    // Generar gradiente de colores
    for (let i = 0; i < cantidad; i++) {
      // Calcular la escala para interpolación lineal
      const escala = i / (cantidad - 1);
  
      // Calcular color intermedio
      const colorIntermedio = colorVerde.map((canal, j) =>
        Math.round(canal + escala * (colorRojo[j] - canal))
      );
  
      // Agregar color a la lista
      colores.push(colorIntermedio);
    }
  
    // Convertir a formato RGB
    const coloresRGB = colores.map(color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
  
    // Opcional: Convertir a formato hexadecimal
    const coloresHex = colores.map(color =>
      `#${color.map(canal => canal.toString(16).padStart(2, '0')).join('')}`
    );
  
    return { rgb: coloresRGB, hex: coloresHex };
  }
  
  // Ejemplo de uso: Obtener 15 colores del gradiente
  const cantidadColores = 7;
  const coloresGradiente = generarGradienteColores(cantidadColores);
  
  console.log('Colores RGB:', coloresGradiente.rgb);
  console.log('Colores HEX:', coloresGradiente.hex);