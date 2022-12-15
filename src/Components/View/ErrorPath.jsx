import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../img/loading.gif'
export default function ErrorPath() {
    return (
        <div className="errorNoti">
          <h1>Oops.... wrong address!</h1>
          <img src={img} alt="img-paynofound" className="imgCat" />
          <div className="buttonn">
            <Link
              to="/"
              type="button"
              className="text-decoration-none btn btn-dark"
            >
              Back home
            </Link>
          </div>
        </div>
)}