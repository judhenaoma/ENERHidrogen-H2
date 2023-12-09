import { useState, useEffect  } from 'react'
import './App.css'
import { Mapa } from './componentes/Mapa/Mapa'
import { BarraLateralCapas } from './componentes/Ui/BarraLateralCapas'
import { BarraNavegacion } from './componentes/Ui/BarraNavegacion'
import { esquemaCapas } from './esquemaCapas'
import { esquemaCapasColombia } from './esquemaCapasColombia'
import { Routes, Route } from 'react-router-dom'
import { MapaColombia } from './componentes/MapaColombia/MapaColombia'
import { esquemaPotencialEnergia } from './esquemaPotencialEnergia'
import { BarraPotencialEnergia } from './componentes/Ui/BarraPotencialEnergia'
import { AboutPage } from './pages/AboutPage/AboutPage'	
import { Login } from './pages/LoginPage/Login'
import { RutasPrivadas } from './routes/RutasPrivadas'
import { RutasPublicas } from './routes/RutasPublicas'
import { useNavigate } from 'react-router-dom'
import { Redirect_ } from './routes/Redirect'
// import { Registros } from './pages/Registros/Registros'


function App() {

  const [ capas, setCapas ] = useState(esquemaCapas)
  const [ capasColombia, setCapasColombia ] = useState(esquemaCapasColombia)
  const [ potenciales , setPotenciales ] = useState(esquemaPotencialEnergia)
  const [usuarioLogeado, setUsuarioLogeado ] = useState(false)
  const navegar = useNavigate()

  useEffect(() => {
    const logged = localStorage.getItem('modergisLogged')
    if(logged){
      setUsuarioLogeado(true)
    }
  }, [])

  const manejarCapas = (id) => {

    const capasActualizadas = capas.map((capa) => {
      if (capa.children){
        const sub = capa.children.map( subitem => {
          if(subitem.id === id){
            return {...subitem, activo : !subitem.activo }
          }
          return subitem
        })
        return {...capa, children : sub}
      }
      return capa
    })

    setCapas(capasActualizadas)
    console.log(capasActualizadas)
  }
   
  const manejarCapasColombia = (id) => {

    const capasActualizadas = capasColombia.map((capa) => {
      if (capa.children){
        const sub = capa.children.map( subitem => {
          if(subitem.id === id){
            return {...subitem, activo : !subitem.activo }
          }
          return subitem
        })
        return {...capa, children : sub}
      }
      return capa
    })

    setCapasColombia(capasActualizadas)
  }

  const manejadorCapasPotenciales = (id) => {

    const potencialesActualizado = potenciales.map( (capa) =>{
      if(capa.id === id){
        return {...capa, activo : !capa.activo}
      }
      return capa
    } )

    setPotenciales(potencialesActualizado)

  }

  const cerrarSesion = () => {
    setUsuarioLogeado(false)
    navegar('/')
    localStorage.removeItem('modergisLogged')
    
}

  return (
    <div id='main_modergis'>
      <BarraNavegacion  
        usuarioLogeado = { usuarioLogeado } 
        cerrarSesion = { cerrarSesion }
      />

      <Routes>  
        <Route path='/' element={
          <RutasPublicas usuarioLogeado={usuarioLogeado}>
            <Login setUsuarioLogeado={setUsuarioLogeado}/>
          </RutasPublicas> 
        }
        />

        <Route path='/antioquia' element={
          <RutasPrivadas 
            usuarioLogeado={usuarioLogeado} 
            setUsuarioLogeado={setUsuarioLogeado}
          >
            <div id='main_mapa_antioquia' className='flex justify-stretch gap-1 relative'>
              <BarraLateralCapas capas={capas} manejarCapas={manejarCapas} />
              <Mapa  capas={capas} potenciales={potenciales} />
              <BarraPotencialEnergia potenciales={potenciales} manejarPotenciales = {manejadorCapasPotenciales} />
            </div>
          </RutasPrivadas>                          
          } 
        />

        <Route path='/acerca' element={<AboutPage/>}/>

        <Route path='/colombia' element={
          <RutasPrivadas
            usuarioLogeado={usuarioLogeado} 
            setUsuarioLogeado={setUsuarioLogeado}
          
          >
            <div id='main_mapa_colombia' className='flex justify-stretch gap-1'>
              <BarraLateralCapas capas={capasColombia} manejarCapas={manejarCapasColombia} />
              <MapaColombia  capas={capasColombia} manejarCapas = {manejarCapasColombia} />
            </div>
        </RutasPrivadas>
        } 
        />


      {/* <Route path='/registros' element={<Registros/>}/> */}

      
        <Route path = '*' element = {<Redirect_ to = '/antioquia' />}/>
      </Routes>
    </div>
  )

}


export default App
