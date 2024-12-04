import { useState, useEffect, createContext  } from 'react'
import './App.css'
import { Mapa } from './componentes/MapaAntioquia/Mapa'
import { BarraNavegacion } from './componentes/Ui/BarraNavegacion'
import { esquemaCapas } from './scripts/esquemaCapas'
import { Routes, Route } from 'react-router-dom'
import { esquemaPotencialEnergia } from './scripts/esquemaPotencialEnergia'
import { About } from './componentes/AboutPage/About'
import { Login } from './componentes/LoginPage/Login'
import { RutasPrivadas } from './routes/RutasPrivadas'
import { RutasPublicas } from './routes/RutasPublicas'
import { useNavigate } from 'react-router-dom'
import { Redirect_ } from './routes/Redirect'
import { Registros } from './componentes/RegistrosPage/Registros'
import { BarraLateralIzquierda } from './componentes/MapaAntioquia/MenulzquierdaMapa'
import { MenuDerechaMapa } from './componentes/MapaAntioquia/MenuDerechaMapa'
import { LayoutCombustibles } from './componentes/CombustiblesPage/LayoutCombustibles'
import { SankeyLayout } from './componentes/SankeyPage/SankeyLayout'
import { EmisionesLayout } from './componentes/EmisionesPage/EmisionesLayout'
import { SustitutionLayout } from './componentes/SustitutionPage/SustitutionLayout'
import { ResultTable } from './componentes/ResultsPage/ResultTable'


function App() {
  const [ capas, setCapas ] = useState(esquemaCapas)
  const [ potenciales , setPotenciales ] = useState(esquemaPotencialEnergia)
  const [ usuarioLogeado, setUsuarioLogeado ] = useState(false)
  const [ isGuest, setIsGuest ] = useState(false)
  const [ mostrarEnBarraDerecha , setMostrarEnBarraDerecha ] = useState(null)
  const [tileSeleccionadoAntioquia, setTileSeleccionadoAntioquia ] = useState('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
  const [tileSeleccionadoCombustibles, setTileSeleccionadoCombustibles ] = useState('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
  const [ mostrarAguaSostenible, setMostrarAguaSostenible ] = useState(false)
  
  const navegar = useNavigate()

  useEffect(() => {
    const logged = localStorage.getItem('modergisLogged')
    const isGuest = localStorage.getItem('isGuest')
    if(logged){
      setUsuarioLogeado(true)
    }
    if(isGuest){
      setIsGuest(true)
    }
  }, [])

  const manejarBarraDerecha = (info) => {
    setMostrarEnBarraDerecha(info)
  }

  const manejarTilesAntioquia = (url) => {
    setTileSeleccionadoAntioquia(url)
  }

  const manejarTilesCombustibles = (url) => {
    setTileSeleccionadoCombustibles(url)
  }

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

  const manejadorCapasPotenciales = (id) => {

   const capaPotenciales = potenciales.map( (capa) => {
      if( capa.children){
         const capaHija = capa.children.map( (hija) => {
          if(hija.id === id){
            return {...hija, activo: !hija.activo}
          }
          return hija
         })

         return {...capa, children : capaHija}
      }
      return capa
   } )

   setPotenciales(capaPotenciales)

  }

  const cerrarSesion = () => {
    setUsuarioLogeado(false)
    navegar('/')
    localStorage.removeItem('modergisLogged')
    localStorage.removeItem('isGuest')
}

  return (
    <div id='main_modergis' className='relative'>
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
            <div id='main_mapa_antioquia'>
              <Mapa  
                 capas={capas} 
                 potenciales={potenciales} 
                 tileSeleccionado={tileSeleccionadoAntioquia}
                 manejarBarraDerecha = {manejarBarraDerecha}
                 mostrarAguaSostenible = {mostrarAguaSostenible}
              />
              <BarraLateralIzquierda 
                 capas={capas} 
                 manejarCapas={manejarCapas} 
                 manejarTiles = {manejarTilesAntioquia} 
                 tileSeleccionado={tileSeleccionadoAntioquia} 
                 potenciales={potenciales} 
                 manejarPotenciales = {manejadorCapasPotenciales}
              />
              <MenuDerechaMapa
                 mostrarEnBarraDerecha = {mostrarEnBarraDerecha}
                 manejarBarraDerecha = {manejarBarraDerecha}
                 setMostrarAguaSostenible = {setMostrarAguaSostenible}
                 mostrarAguaSostenible = {mostrarAguaSostenible}
              />
            </div>
          </RutasPrivadas>                          
          } 
        />


        <Route path='/combustibles' element={
          <RutasPrivadas 
            usuarioLogeado={usuarioLogeado} 
            setUsuarioLogeado={setUsuarioLogeado}
          >
          <LayoutCombustibles
            tileSeleccionado={tileSeleccionadoCombustibles}
            manejarTiles = {manejarTilesCombustibles} 
          />
          </RutasPrivadas>
          } 
        />

        <Route path='/emisiones' element={
          <RutasPrivadas 
            usuarioLogeado={usuarioLogeado} 
            setUsuarioLogeado={setUsuarioLogeado}
          >
            <EmisionesLayout/>
          </RutasPrivadas>
          } 
        />

        <Route path='/simulacion' element={<SankeyLayout/>} />
        <Route path='/sustitucion' element={<SustitutionLayout/>} />
        <Route path='/resultados' element={<ResultTable/>} />
        <Route path='/acerca' element={<About/>}/>
        <Route path='/registros' element={!guest ? <Registros isGuest = {isGuest}/> : null }/>      
        <Route path = '*' element = {<Redirect_ to = '/antioquia' />}/>
      </Routes>
    </div>
  )

}


export default App
