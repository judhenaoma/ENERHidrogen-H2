import { PortalNasaVientos } from "../../pages/PortalNasaVientos"
import { BotonCierre } from "./BotonCierre"
function ModalPortalNasa ({manejarCapas}) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-11/12 mx-auto my-0 mt-0 mb-0 mr-2 z-[9999]">
      <PortalNasaVientos/>
      <BotonCierre manejarCapas = {manejarCapas} />
    </div>

  )
}

export { ModalPortalNasa }
