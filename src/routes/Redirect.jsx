import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect_ = ({to}) => {
    const navegar = useNavigate()

    useEffect(() => {
        navegar(to)

    }, [navegar, to])

  return null
}


export { Redirect_ }