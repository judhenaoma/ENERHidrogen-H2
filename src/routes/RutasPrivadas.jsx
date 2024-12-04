import React from 'react'
import { Redirect_ } from './Redirect'

function RutasPrivadas({ usuarioLogeado, children }) {

    return ( 
        <>
            {usuarioLogeado ? children : <Redirect_ to="/" /> }
        </>
    );
}
export { RutasPrivadas }
