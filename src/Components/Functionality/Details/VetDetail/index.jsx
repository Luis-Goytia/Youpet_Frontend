import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { clearDetails, getVetsDetail } from "../../../../Redux/actions";
import './vetDetail.css';

export default function VetDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const vet = useSelector((state) => state.vetDetail);
  const [, navigate] = useLocation();

  const addFav = (id) => {
    //if (no esta logeado) {
    //return navigate("/login");
    alert(id)
  }


  useEffect(() => {
    dispatch(getVetsDetail(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <div className="vet-cards">
      <div className='vet-card-detail'>
        <img className='vet-profile-photo' src={vet.img} alt="Not found" />
        <div>
          <h1 className="vet-profile-name">
            {vet.name} {vet.lastname}
          </h1>
          <h2 className="vet-speciality">{vet.speciality}</h2>
        </div>
        <h3>Average: {vet.average}</h3>
        <div>
          <button onClick={() => { addFav(id) }}> ❤️</button>
          <span>{vet.fav}</span>
        </div>
      </div>

      <div className="vet-comments">
        <div className="input-container">
          <div className="input-card comment-cards">
            <h3>Leave a comment:</h3>
            <textarea className="vet-form-comment" type="text" />
          </div>
        </div>

        <div className="user-comments">
          <div className="comment-cards">
            <h2 className="client-name">Nicolas Villareal:</h2>
            <h3 className="client-comment">Excelente!</h3>
          </div>

          <div className="comment-cards">
            <h2 className="client-name">Lucas Pantana:</h2>
            <h3 className="client-comment">Muy buena atencion xd</h3>
          </div>
        </div>

      </div>

    </div>
  );
}
