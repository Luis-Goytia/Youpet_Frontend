import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addFavorites, clearDetails, getVetsDetail, removeFav } from "../../../../Redux/actions";
import './vetDetail.css';

export default function VetDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const vet = useSelector((state) => state.vetDetail);
  const myuser = useSelector((state) => state.myuser);

  const remfav = () => {
    dispatch(removeFav(id, myuser.id));
  };

  const addFav = () => {
    dispatch(addFavorites(id, myuser.id));

  };

  useEffect(() => {
    dispatch(getVetsDetail(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <div className="vet-cards">
      <div className="vet-card-detail">
        <img className="vet-profile-photo" src={vet.img} alt="Not found" />
        <div>
          <h1 className="vet-profile-name">
            {vet.name} {vet.lastname}
          </h1>
          <h2 className="vet-speciality">{vet.speciality}</h2>
        </div>
        <div>
          {vet.isFavorite ? (
            <button onClick={remfav}>❤️</button>
          ) : (
            <button onClick={addFav}>🖤</button>
          )}
          <span>{vet.totalfav}</span>
        </div>
      </div>
    </div>
  );
}
