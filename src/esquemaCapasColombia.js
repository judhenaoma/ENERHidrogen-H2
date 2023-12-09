

export const esquemaCapasColombia = [
    // {
    //   nombre: 'Cartografía Base',
    //   children: [
    //     // { nombre: 'Municipios', activo : false, id : 'municipios' },
    //   ],
    // },
    {
      nombre : 'Infraestructura',
      children : [
        {
          nombre : 'Líneas Trasmisión', activo : false, id : 'lineasTrasmision'
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
      nombre : 'Factibilidad',
      children : [
        {
          nombre : 'Radiación Solar por día', activo : false, id : 'radiacionSolar'
        },
        {
          nombre : 'Brillo Solar por día', activo : false, id : 'brilloSolar'
        },
        {
          nombre : 'Velocidad Vientos', activo : false, id : 'velocidadVientos'
        }
      ]
    },

    {
      nombre: 'Cartografía Temática',
      children: [
        // { nombre: 'Rios', activo : false, id : 'Rios' },
        // {
        //   nombre : 'Precipitación', activo : false, id : 'precipitacion'
        // },
        {
          nombre : 'Cuencas', activo : false, id : 'cuencasHidro'
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
          nombre : 'Restricciones legales', activo : false, id: 'restriccionLegal'
        }    
      ],
    },
    {
      nombre : 'Complementos',
      children : [
        {
          nombre : 'Portal Vientos NASA', activo : false, id : 'vientosNasa'
        }
      ]
    },
    // {
    //   nombre : 'Velocidad de Viento',
    //   children : [
    //     {
    //       nombre : 'Viento Promedio NASA', activo : false, id : 'vientosPromNasa'
    //     }
    //   ]
    // }
  ];