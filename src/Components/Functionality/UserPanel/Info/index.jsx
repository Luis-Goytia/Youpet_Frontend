import React from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import userPlaceholder from "../../../../img/user-placeholder.png";
import loadingSvg from "../../../../img/loading_dualring.svg";
import petPlaceholder from "../../../../img/pets.png";
import { getUserTurns, clearCancelTurnUser, cancelTurnUser } from "../../../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import infoStyle from "./info.module.css";
import Swal from "sweetalert2";


export default function Info() {
  const myuser = useSelector((state) => state.myuser);
  const myturns = useSelector((state) => state.turnsUser);
  const cancelTurnState = useSelector((state) => state.cancelTurn);

  const [isLoading, setIsLoading] = useState(false);
  const [cargarTurns, setCargarTurns] = useState(true)


  const dispatch = useDispatch()

  useEffect(()=>{
    if (myuser?.id && cargarTurns) {
      setCargarTurns(false)
      dispatch(getUserTurns(myuser.id))
    }
  }, [myuser, dispatch, cargarTurns])



  useEffect(()=>{
    if (isLoading) {
      
      if (cancelTurnState[0] === "nada") {
        Swal.fire({
          iconHtml: `<img src=${loadingSvg} alt="Loading"/>`,
          title: `Loading`,
          showConfirmButton: false,
        });
      } else if (cancelTurnState[0] === "ok") {
        setTimeout(() => {
          Swal.close();
        }, "400");

        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: `Turn canceled`,
            showConfirmButton: false,
            timer: 1000,
          });
        }, "600");
        setIsLoading(false);
        setCargarTurns(true)
      } else if (cancelTurnState[0] === "error") {
        setTimeout(() => {
          Swal.close();
        }, "400");

        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: `error`,
            showConfirmButton: false,
            timer: 1000,
          });
        }, "600");
        setIsLoading(false);
      }
    }
  }, [isLoading, cancelTurnState])




  const handleCancelButton = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        dispatch(clearCancelTurnUser());
        dispatch(cancelTurnUser(id));
      }
    })

  }

  return (
    <Box m="20px">
      <Box>
        <Header title="Info" subtitle="Welcome" />
      </Box>
      <Box>
        {myuser?.id ? (
          <div className={infoStyle.container}>
            <div className={infoStyle.card}>
              <div className={infoStyle.img_container}>
                <img
                  src={myuser.img ? myuser.img : userPlaceholder}
                  alt="User"
                  className={infoStyle.img_user}
                />
              </div>
              <div className="mt-3">
                <h4>
                  {myuser.name ? myuser.name : "none"}{" "}
                  {myuser.lastname ? myuser.lastname : ""}
                </h4>
                <p className="text-secondary mb-1">Youpet user</p>
              </div>
            </div>

            <div className={infoStyle.card}>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Username</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {myuser.username ? myuser.username : "none"}{" "}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {myuser.email ? myuser.email : "none"}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">DNI</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {myuser.dni ? myuser.dni : "none"}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {myuser.tel ? myuser.tel : "none"}
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {myuser.address ? myuser.address : "none"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <img src={loadingSvg} alt="profile" />
        )}

        <Box>
          {myturns?.length ? (
            <div>
              <div className="container my-5">
                <h4>Turns</h4>
                <div className="shadow-4 rounded-5 overflow-hidden">
                  <table className="table align-middle mb-0 bg-white">
                    <thead className="bg-light">
                      <tr>
                        <th>Service</th>
                        <th>Vet</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
              {
                myturns.map(turn => {
                  let dateTurn = ""
                  if (turn.inicialDate){
                    let date = new Date(turn.inicialDate)
                    
                    dateTurn = date.toLocaleString("en-US", {
                      year: "numeric",
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  } 
                  
                  return (
                    <tr key={turn.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={petPlaceholder}
                          alt="petImg"
                          className={"rounded-circle " + infoStyle.tableImg}
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{turn.Service?.name || ""}</p>
                        </div>
                      </div>
                    </td>


                    <td>
                      <p>{`${turn.Vet?.name} ${turn.Vet?.lastname}`|| ""}</p>
                    </td>
                    
                    <td>
                      <p>{dateTurn}</p>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-rounded"
                        onClick={()=>handleCancelButton(turn.id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                  )
                })
              }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className={infoStyle.turnsContainer}>
              <div className="container my-5">
                <h4>Turns</h4>
                <div className="shadow-4 rounded-5 overflow-hidden">
                  <table className="table align-middle mb-0 bg-white">
                    <thead className="bg-light">
                      <tr>
                      <th>Service</th>
                        <th>Vet</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={petPlaceholder}
                              alt="petImg"
                              className={"rounded-circle " + infoStyle.tableImg}
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">No turns</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p></p>
                        </td>

                        <td>
                          <p></p>
                        </td>

                        <td>
                          <p></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
}
