import React from "react";
import { Box } from "@mui/material";
import Header from "../../Header";
import petStyle from "./pets.module.css";
import loadingSvg from "../../../../../img/loading_dualring.svg";
import petPlaceholder from "../../../../../img/pets.png";
import { useSelector, useDispatch } from "react-redux";
import { getUserPets, clearRemovePet, removePetUser } from "../../../../../Redux/actions";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
function MyPets() {
  const myuser = useSelector((state) => state.myuser);
  const mypets = useSelector((state) => state.userPets);
  const removePetState = useSelector((state) => state.removePet);
  const [cargarPets, setCargarPets] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(()=>{
    if (myuser?.id && cargarPets) {
      setCargarPets(false)
      dispatch(getUserPets(myuser.id))
    }
  
  }, [myuser, dispatch, mypets, cargarPets])




  useEffect(()=>{
    if (isLoading) {
      
      if (removePetState[0] === "nada") {
        Swal.fire({
          iconHtml: `<img src=${loadingSvg} alt="Loading"/>`,
          title: `Loading`,
          showConfirmButton: false,
        });
      } else if (removePetState[0] === "ok") {
        setTimeout(() => {
          Swal.close();
        }, "400");

        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: `Pet removed sucessfully`,
            showConfirmButton: false,
            timer: 1000,
          });
        }, "600");
        setIsLoading(false);
        setCargarPets(true)
      } else if (removePetState[0] === "error") {
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
  }, [isLoading, removePetState])

  

  const handleRemoveButton =(id)=>{

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        dispatch(clearRemovePet());
        dispatch(removePetUser(id));
      }
    })

  }
 
  return (
    <Box m="20px">
      <Box>
        <Header title="MyPets" subtitle="Here we show all your pets" />
      </Box>
      {mypets?.length ? (
        
          <div className={petStyle.container}>
            <div className="container my-5">
              <div className="shadow-4 rounded-5 overflow-hidden">
                <table className="table align-middle mb-0 bg-white">
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Species</th>
                      <th>Detail</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      mypets.map(pet => {
                        return(
                          <tr key={pet.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={pet.img || petPlaceholder}
                                alt="petImg"
                                className={"rounded-circle " + petStyle.tableImg}
                              />
                              <div className="ms-3">
                                <p className="fw-bold mb-1">{pet.name || ""}</p>
                              </div>
                            </div>
                          </td>
    
                          <td>
                            <p>{pet.species || ""}</p>
                          </td>
    
                          <td>
                            <p>{pet.detail || ""}</p>
                          </td>
    
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-rounded"
                              onClick={()=>handleRemoveButton(pet.id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                        )
                      } )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        
      ) : (
        
        <div>
          <div className="container my-5">
            <div className="shadow-4 rounded-5 overflow-hidden">
              <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                  <tr>
                    <th>Name</th>
                    <th>Species</th>
                    <th>Detail</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={petPlaceholder}
                          alt="petImg"
                          className={"rounded-circle " + petStyle.tableImg}
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">No pets</p>
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
      )}
    </Box>
  );
}

export default MyPets;
