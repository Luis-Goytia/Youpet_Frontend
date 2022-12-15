import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetails, getServiceDetail } from "../../../../Redux/actions";
import "./serviceDetail.css";

export default function ServiceDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.serviceDetail);
  const myuser = useSelector((state) => state.myuser);

  useEffect(() => {
    dispatch(getServiceDetail(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <div className="service-detail-card">
      <h1>{service.name}</h1>

      <div className="cardde">
        <div className="cardde_image">
          <img src={service.img} alt="Not found" />
        </div>
        <div className="cardde_title title-white"></div>
      </div>
      <h2>{service.detail}</h2>
      <p>Timelapse: {service.timelapse} min</p>
      <p className="textt">Price: ${service.price}</p>
      <div>
        {!myuser?.id ? (
          <Link
            to="/login"
            type="button"
            className="text-decoration-none btn btn-dark"
          >
            Sign in to take a turn
          </Link>
        ) : (
          <Link
            to="turn"
            type="button"
            className="text-decoration-none btn btn-dark"
          >
            Take turn
          </Link>
        )}
      </div>
    </div>
  );
}
