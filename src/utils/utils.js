function rgbToHex(r, g, b) {
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + toHex(r) + toHex(g) + toHex(b);
}



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
  
  
  

export function generarGradienteV2(numColores) {
    const colores = [];
    
    //RGB para #ffff80
    const r1 = 255;
    const g1 = 255;
    const b1 = 128;

    // RGB para #0c1078
    const r2 = 12;
    const g2 = 16;
    const b2 = 120;

    for (let i = 0; i < numColores; i++) {
        // Interpolate between the two colors
        const r = Math.round((r2 - r1) * (i / (numColores - 1)) + r1);
        const g = Math.round((g2 - g1) * (i / (numColores - 1)) + g1);
        const b = Math.round((b2 - b1) * (i / (numColores - 1)) + b1);
  
        const color = rgbToHex(r, g, b);
        colores.push(color);
    }
  
    return colores;
}