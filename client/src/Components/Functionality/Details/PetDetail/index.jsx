import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetails, getPetDetail } from "../../../../Redux/actions";

export default function PetDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const pet = useSelector((state) => state.petDetail);

  useEffect(() => {
    dispatch(getPetDetail(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <div>
        <div>
        <Link to='/formdescrip'>Add History</Link>
        </div>
      <h1>Pet Profile</h1>
      <Link to="/profile/:id" type="button" className="text-decoration-none btn btn-dark">
        Regresar
      </Link>
        <div>
          <img src={pet.image} alt="pet" width="300px" height="300px"
          />
          <h1>{pet.name}</h1>
          <h3>Date: {pet.date}</h3>
          <h5>Detail: {pet.detail}</h5>
          <h3>Medical Diagnostic:</h3>
          {
            pet.medicalDiagnostic?.map(diagnostic=>{
              return(<h5>{diagnostic}</h5>)

            }
            )
          }
        </div>

    </div>
  );
}
