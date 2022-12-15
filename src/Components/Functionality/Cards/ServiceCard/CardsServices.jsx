import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterService } from "../../../../Redux/actions";
import ServiceCard from "./index";
export default function CardsServices() {
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.services);

  function handleFilter(event) {
    event.preventDefault();
    dispatch(filterService(event.target.value));
  }

  return (
    <div>
      <div className="buttonbar">
        <div
          className="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
          onChange={(event) => handleFilter(event)}
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            value={""}
          />
          <label className="btn btn-outline-dark" htmlFor="btnradio1">
            All Services
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            value={"Healthcare Clinic"}
          />
          <label className="btn btn-outline-dark" htmlFor="btnradio2">
            Healthcare Clinic
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio3"
            value={"Surgery and Anesthesia"}
          />
          <label className="btn btn-outline-dark" htmlFor="btnradio3">
            Surgery and Anesthesia
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio4"
            value={"Diagnostics"}
          />
          <label className="btn btn-outline-dark" htmlFor="btnradio4">
            Diagnostics
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio5"
            value={"Aesthetics"}
          />
          <label className="btn btn-outline-dark" htmlFor="btnradio5">
            Aesthetics
          </label>
        </div>
      </div>
      <div className="grid-fluid"></div>
      <h1>Services</h1>
      <div className="cardl-list">
        <div className="grid-fluid">
          {allServices
            ? allServices.map((service) => {
                return (
                  <div key={service.id} className="m-2">
                    <Link
                      to={`/service/${service.id}`}
                      type="button"
                      className="text-decoration-none"
                    >
                      <ServiceCard
                        name={service.name}
                        id={service.id}
                        img={service.img}
                      />
                    </Link>
                  </div>
                );
              })
            : "No found services"}
        </div>
      </div>
    </div>
  );
}
