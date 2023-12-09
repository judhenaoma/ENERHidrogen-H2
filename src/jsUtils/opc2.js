export function generarGradienteV2(numColores) {
    const colores = [];
    
    // RGB values for #ffff80
    const r1 = 255;
    const g1 = 255;
    const b1 = 128;

    // RGB values for #0c1078
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

function rgbToHex(r, g, b) {
    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
  
    return "#" + toHex(r) + toHex(g) + toHex(b);
}