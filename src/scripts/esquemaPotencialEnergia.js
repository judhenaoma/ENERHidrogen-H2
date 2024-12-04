


export const esquemaPotencialEnergia = [

  {
    nombre : 'Energia solar',
    children : [
      {
              nombre: 'Radiación global horizontal (GHI) por año',
              activo : false, 
              id : 'energiaFotovoltaica' 
            
      }

    ]
  },
  {
    nombre : 'Energia eólica',
    children : [
          {
           nombre: 'Velocidad de viento a 50 m',
           activo : false, 
           id : 'energiaEolica50' 
          },
          {
            nombre: 'Velocidad de viento a 100 m',
            activo : false, 
            id : 'energiaEolica100' 
          }
    ]
  }

]