

export const esquemaCapas = [
    {
      nombre: 'Cartografía Base',
      children: [
        { nombre: 'Centros poblados', activo : false, id : 'centrosPoblados' },
        { nombre: 'Municipios', activo : false, id : 'municipios' },
        { nombre: 'Subregiones', activo : false, id : 'subregiones' }
      ]
    },
    {
      nombre : 'Infraestructura',
      children : [
        {
          nombre : 'Líneas Trasmisión', activo : false, id : 'lineasTrasmision'
        },
        {
          nombre : 'Líneas Trasmisión ISA', activo : false, id : 'lineasTrasmisionISA'
        },
        {
          nombre : 'Subestaciones', activo : false, id : 'subestaciones'
        },
        {
          nombre : 'Subestaciones Distribución', activo : false, id : 'subestacionesISA'
        },
        {
          nombre : 'Centrales', activo : false, id : 'centrales'
        }
      ]
    },
    {
      nombre : 'Insumos factibilidad',
      children : [
        {
          nombre : 'Radiación solar diaria', activo : false, id : 'radiacionSolar'
        },
        {
          nombre : 'Brillo solar diario', activo : false, id : 'brilloSolar'
        },
        {
          nombre: 'Densidad de potencia eólica a 50 m',
          activo : false, 
          id : 'densidadPotenciaEolica50' 
        },
        {
          nombre: 'Densidad de potencia eólica a 100 m',
          activo : false, 
          id : 'densidadPotenciaEolica100' 
        },
        {
          nombre: 'Estaciones caudal IDEAM',
          activo : false, 
          id : 'estacionesIDEAM' 
        },
        {
          nombre: 'Oferta hídrica Antioquia',
          activo : false, 
          id : 'ofertaHidrica' 
        }
      ]
    },

    {
      nombre: 'Cartografía Temática',
      children: [
        
        { nombre: 'Rios principales', activo : false, id : 'Rios' },
        
        {
          nombre : 'Precipitación', activo : false, id : 'precipitacion'
        },
        {
          nombre : 'Cuencas principales', activo : false, id : 'cuencasPrincipales'
        },
        { nombre: 'Rios y quebradas', activo : false, id : 'quebradas' },
        { nombre: 'Unidades carboníferas', activo : false, id : 'carbon' },
        { nombre: 'Contratos Hidrocarburos', activo : false, id : 'hidrocarburos' },
        {
          nombre : 'Coberturas vegetales', activo : false , id: 'coberturas'
        }

      ],
    },
    {
      nombre: 'Restricciones',
      children: [
        { nombre: 'Páramos', activo : false, id : 'paramos' },
        {
            nombre : 'Parques Nacionales', activo : false, id : 'parquesNal'
        },
        {
          nombre : 'Comunidades Indígenas', activo : false, id : 'indigenas'
        },
        {
            nombre : 'Comunidades negras', activo : false, id : 'negros'
        },
        {
          nombre : 'Mapa Sostenible', activo : false , id: 'restriccionLegal'
        }      
      ],
    },
  ];