import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function BotonCierre ( { cerrarModal } ) {

  return (
    <div className='absolute top-1 right-1 z-[9999]'>
        <FontAwesomeIcon size="2x"  icon={faXmarkCircle} onClick={cerrarModal} className="cursor-pointer text-white" />
    </div>
  )
}


export { BotonCierre }