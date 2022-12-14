import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Confirm = () => {
  const [verify, setVerify] = useState(null);
  const { confirmationCode } = useParams();
  useEffect(() => {
    if (confirmationCode)
      axios
        .get(`https://youpet-production.up.railway.app/confirm/${confirmationCode}`)
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
      <Link to={"/login"}>SIGN IN</Link>
    </div>
  );
};
export default Confirm;
