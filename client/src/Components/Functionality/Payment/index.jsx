import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentMP } from "../../../Redux/actions";
import logomp from "../../../img/logomp.png"
//import "./Payment.css"
export default function Payment() {
  const dispatch = useDispatch();
  const PaymentLink = useSelector((state) => state.paymentLink);
  const Turns = useSelector(state => state.turn)
  
 const turnInfo = {
  timelapse: Turns[0].service.name,
  globalprice: Turns[0].service.price,
};
  const handleClick = (e) => {
    dispatch(
      getPaymentMP([
        {
          name: turnInfo.name,
          price: turnInfo.globalprice,
        },
      ])
    );
  };
  return (

      <div>
        <>
          <h1>Are you sure of the turn?</h1>
          {!PaymentLink.id ? (
            <button
              onClick={(e) => {
                handleClick(e);
              }}
              type="button"
              className="btn btn-primary"
            >
              Pay in Mercado Pago
            </button>
          ) : (
              <div className="pay">
                <img src={logomp} alt="logomp" />
              <a href={PaymentLink.init_point} className="btn btn-success">
                Pagar
              </a>
            </div>
          )}
          <h4>You will be redirected to home</h4>
        </>
      </div>
  );
}
