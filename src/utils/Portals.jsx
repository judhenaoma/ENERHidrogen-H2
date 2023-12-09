import ReactDOM from "react-dom";

function Portals({children}){

    return ReactDOM.createPortal(
        <div className='relative shadow-lg'>
            {children}
        </div>,
        document.getElementById('portal')
    )

}


export { Portals }