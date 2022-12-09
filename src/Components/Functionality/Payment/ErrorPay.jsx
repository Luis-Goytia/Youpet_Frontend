import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPay() {
    return (<div>
        <h1>Ups.... no se pudo concretar el pago</h1>
        <Link to={"/"} type="button">
            Volver al Home
        </Link>
    </div>)
}