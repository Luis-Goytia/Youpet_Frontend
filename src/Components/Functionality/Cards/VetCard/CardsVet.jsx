import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VetCard from "./";
import { getVets } from "../../../../Redux/actions";

export default function CardsVet() {
  const allVets = useSelector((state) => state.vets);

  return (
    <div>
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
