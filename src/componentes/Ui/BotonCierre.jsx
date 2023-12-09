import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function BotonCierre ( {manejarCapas} ) {

    const cerrarModal = () => {
        manejarCapas('vientosNasa')
    }
    
  return (
    <div className='absolute top-0 right-0'>
        <FontAwesomeIcon size="2x"  icon={faXmarkCircle} onClick={cerrarModal} className="cursor-pointer text" />
    </div>
  )
}


export { BotonCierre }