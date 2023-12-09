export function generarGradiente(numColores) {
    const colores = [];
    
    for (let i = 0; i < numColores; i++) {
      const verde = Math.round((255 / (numColores - 1)) * i);
      const rojo = Math.round((255 / (numColores - 1)) * (numColores - 1 - i));
      const amarillo = 255 - verde;
  
      const color = rgbToHex(rojo, verde, 0);
      colores.push(color);
    }
  
    return colores.reverse();
  }
  
  function rgbToHex(r, g, b) {
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
  
    return "#" + toHex(r) + toHex(g) + toHex(b);
  }
  
  // Ejemplo de uso: obtener 15 colores en el gradiente
  const coloresGradiente = generarGradiente(20);
  console.log(coloresGradiente);
  