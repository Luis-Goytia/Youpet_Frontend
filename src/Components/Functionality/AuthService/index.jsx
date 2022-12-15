import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./AuthService.css"

const Confirm = () => {
  const [verify, setVerify] = useState(null);
  const { confirmationCode } = useParams();
  useEffect(() => {
    if (confirmationCode)
      axios
        .get(`http://localhost:3001/confirm/${confirmationCode}`)
        .then((response) => {
          setVerify(true);
        })
        .catch(() => {
          setVerify(false);
        });
  }, [confirmationCode]);
  if (verify === null) return <div>estamos verificando tu cuenta</div>;
  if (!verify) return <div>No pudimos confirmar tu cuenta</div>;
  return (
    <div>
      <header>
        <h3>
          <strong>Confirmed Account!</strong>
        </h3>
      </header>
      <br />
      <Link to={"/login"} type="button" className="text-decoration-none btn btn-primary">SIGN IN</Link>
    </div>
  );
};
export default Confirm;
