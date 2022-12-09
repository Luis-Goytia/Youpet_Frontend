import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetails, getServiceDetail } from "../../../../Redux/actions";
import './serviceDetail.css';

export default function ServiceDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.serviceDetail);

  useEffect(() => {
    dispatch(getServiceDetail(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <div className="service-detail-card">
      <h1>{service.name}</h1>
      <img src={service.img} alt="Not found" />
      <h2>{service.detail}</h2>
      <p>Timelapse: {service.timelapse} min</p>
      <p>Price: ${service.price}</p>
      <Link
        to="turn"
        type="button"
        className="text-decoration-none btn btn-dark"
      >
        Take turn
      </Link>
    </div>
  );
}
