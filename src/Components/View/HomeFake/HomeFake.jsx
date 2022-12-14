import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterService, getServices, getVets } from "../../../Redux/actions";
import ServiceCard from "../../Functionality/Cards/ServiceCard";
import VetCard from "../../Functionality/Cards/VetCard";
import "./HomeFake.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVets = useSelector((state) => state.vets);
  const allServices = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getVets());
    dispatch(getServices());
  }, [dispatch]);

  function handleFilter(event) {
    event.preventDefault();
    dispatch(filterService(event.target.value));
    // dispatch(filterVets(event.target.value))
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
          {allServices?.map((service) => {
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
          })}
        </div>
      </div>
      <h1>Professionals</h1>
      <div className="cardl-list">
        <div className="grid-fluid">
          {allVets?.map((vet) => {
            return (
              <div key={vet.id} className="m-2">
                <Link
                  to={`/vet/${vet.id}`}
                  type="button"
                  className="text-decoration-none"
                >
                  <VetCard
                    img={vet.img}
                    name={vet.name}
                    lastname={vet.lastname}
                    id={vet.id}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
