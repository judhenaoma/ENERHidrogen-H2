import { Redirect_ } from './Redirect'

function RutasPublicas ({usuarioLogeado, children}) {

    if(usuarioLogeado){
        return <Redirect_ to="/antioquia" />
    }

    return children
}
export { RutasPublicas }