import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceDetail, clearDetails } from "../../../../Redux/actions";
import { getVets } from "../../../../Redux/actions";

import TakeTurn from "../TakeTurn/index";

import ChooseVetStyle from "./choosevet.module.css";

function ChooseVetTurn() {
  const { servId } = useParams();
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  const [vetSelect, setVetSelect] = useState("none");
  const [updateCalendar, setUpdateCalendar] = useState(false);

  const allVets = useSelector((state) => state.vets);
  const service = useSelector((state) => state.serviceDetail);

  const navigate = useNavigate();
  const path = `/service/${servId}`;

  let findVets = [];

  useEffect(() => {
    async function cargarUsuario() {
      const { data: user } = await axios.get("http://localhost:3001/user");
      if (!user.password) {
        setCargandoUsuario(false);
        return;
      } else {
        try {
          setUsuario(user);
          setCargandoUsuario(false);
        } catch (error) {
          
        }
      }
    }
    cargarUsuario();
  }, []);

  useEffect(() => {
    if (!allVets?.length) {
      dispatch(getVets());
    }

    dispatch(getServiceDetail(servId));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, servId, allVets]);

  const handleSelectChange = (e) => {
    setVetSelect(e.target.value);
    setUpdateCalendar(true);
  };

  return (
    <div>
      <h1 className="header">Turns</h1>
      <div className={ChooseVetStyle.container}>
        <div className="d-flex flex-column ">
          <h1>Vet</h1>

          <select
            name="vets"
            className={"form-select " + ChooseVetStyle.select}
            value={vetSelect}
            onChange={(e) => {
              handleSelectChange(e);
            }}
          >
            <option key={"noneVet"} value={"none"}>
              none
            </option>
            {allVets?.map((vet) => {
              const vetSpeciality = vet.speciality.toLowerCase();
              const serviceType = service?.type?.toLowerCase();

              if (serviceType?.includes(vetSpeciality)) {
                findVets.push(vet);

                return (
                  <option key={vet.id} value={vet.id}>
                    {vet.name} {vet.lastname}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </select>

          <div>
            {vetSelect !== "none" ? (
              findVets.map((vet) => {
                if (vet.id === vetSelect) {
                  return (
                    <div key={vet.id}>
                      <h1>
                        {vet.name} {vet.lastname}
                      </h1>
                      <img
                        src={vet.img}
                        alt="Not found"
                        className={ChooseVetStyle.imgVet}
                      />
                      <h2>{vet.speciality}</h2>
                      <h3>Average: {vet.average}</h3>
                    </div>
                  );
                } else return null;
              })
            ) : (
              <></>
            )}
          </div>
        </div>

        <div>
          <TakeTurn
            vetSelect={vetSelect}
            updateCalendar={updateCalendar}
            setUpdateCalendar={setUpdateCalendar}
          />
        </div>
      </div>
      <button onClick={() => navigate(path)} className={"btn"}>
        Go back
      </button>
    </div>
  );
}

export default ChooseVetTurn;
