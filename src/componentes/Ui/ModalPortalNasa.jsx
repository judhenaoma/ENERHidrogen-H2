import { PortalNasaVientos } from '../../pages/PortalNasaVientos/PortalNasaVientos'
import { BotonCierre } from "./BotonCierre"
import { ModalWrapper } from './ModalWrapper'
function ModalPortalNasa ({ cerrarModal }) {
  return (
    <ModalWrapper>
      <PortalNasaVientos/>
      <BotonCierre cerrarModal = {cerrarModal} />
    </ModalWrapper>
  )
}

export { ModalPortalNasa }
