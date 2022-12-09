import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPets, clearDetails } from "../../../../Redux/actions";
import PetCard from "../../Cards/PetCard";

export default function Profile() {
  const dispatch = useDispatch();
  const allPets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(getPets());
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch]);

  return (
      <div>
        <div>
          <Link
            to="/"
            type="button"
            className="text-decoration-none btn btn-dark"
          >
            Home
          </Link>
          <Link
           to="/pet/register"
           type="button"
           className="text-decoration-none"
           >
            Pet Register
           </Link>
        </div>
        <div>
          <h1>My Profile</h1>
          <div className="grid-fluid">
            <h2>Full name:</h2>
            <h4>DNI:</h4>
            <h4>E-mail:</h4>
            <h4>Addres:</h4>
          </div>
        </div>
        <div className="row">
          <h1>Your Pets</h1>
          {allPets?.map((pet) => {
            return (
              <div key={pet.id} className="col-lg-3">
                <Link
                  to={`/pet/${pet.id}`}
                  type="button"
                  className="text-decoration-none "
                >
                  <PetCard name={pet.name} species={pet.species} id={pet.id} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
}
