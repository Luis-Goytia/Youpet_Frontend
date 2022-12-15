import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, getVets } from "../../../Redux/actions";
import CardsServices from "../../Functionality/Cards/ServiceCard/CardsServices";
import CardsVet from "../../Functionality/Cards/VetCard/CardsVet";
import { useNavigate } from "react-router-dom";
import "./HomeFake.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVets = useSelector((state) => state.vets);
  const allServices = useSelector((state) => state.services);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getServices());
    dispatch(getVets())
  }, [dispatch]);


  if (allVets.length<1 && allServices.length<1) {
    navigate("/errorSearch")
  }
  if (allVets.length>0 && allServices.length<1) {
    return <CardsVet />
  }
  if (allVets.length<1 && allServices.length>0) {
    return <CardsServices/>
  }
  return (
    <div>
      <CardsServices/>
      <CardsVet/>
    </div>
  );
}
