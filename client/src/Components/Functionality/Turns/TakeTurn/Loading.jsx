import React from "react";
import loading_dualring from "./loading_dualring.svg";
import loadingStyle from "./loading.module.css";
import { useNavigate } from "react-router-dom";

function Loading(props) {
  const { createdTur, setIsLoading } = props;

  const navigate = useNavigate();
  const path = `/`;

  if (createdTur?.length){

    setTimeout(() => {
        setIsLoading(false);
        navigate(path)
      }, "3000")
  }
  return (
    <div className={loadingStyle.container}>
      {createdTur?.length ? (
        <>
        <h1>¡Turn successfully created!</h1>
        
        <h4>You will be redirected to home</h4>
        </>
      ) : (
        <img src={loading_dualring} alt="Loading..." />
      )}
    </div>
  );
}

export default Loading;
