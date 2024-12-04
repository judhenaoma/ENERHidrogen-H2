import L from 'leaflet';
import pinIcon from '../assets/icons/location-pin.png'

const iconPin = new L.Icon({
    iconUrl: pinIcon,
    iconRetinaUrl: pinIcon,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [32, 32],
    iconAnchor: [16,32],
    // className: 'leaflet-div-icon'
});

export { iconPin };