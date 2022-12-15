import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import logo from "../../../img/logo.png";
import userPlaceholder from "../../../img/user-placeholder.png";
import {
  getServiceByName,
  getServices,
  getVetByName,
  getVets
} from "../../../Redux/actions";
import dropMenu from "./dropMenu.module.css";
import "./Navbar.css";


export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myuser = useSelector((state) => state.myuser);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getServiceByName(name));
    dispatch(getVetByName(name));
    setName("");
  }

  function handleClick(event) {
    event.preventDefault();
    dispatch(getServices());
    dispatch(getVets())
    navigate("/")
  }

  return (
    <>
      <nav className="navbar navbar-expand-md bg-info">
        <div className="container-fluid">
         
            <img src={logo} alt="Bootstrap" height="55"  onClick={event =>handleClick(event)}/>
      
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-1">
              
              <div>
              {
                myuser?.isAdmin === true ? (
                <Link to="/admin" type="button" className="text-decoration-none btn btn-primary">
                  Admin
                </Link>) : null
              }
              </div>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-4"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(event) => handleInputChange(event)}
              />
              <button
                className="btn btn-outline-success me-4"
                type="submit"
                onClick={(event) => handleSubmit(event)}
              >
                🔎
              </button>
            </form>
            
          </div>
          <div>
            <div className="d-flex">
              {!myuser?.id ? (
                <>
                  <Link to={"/login"}>
                    <button className="btn"> Sign in</button>
                  </Link>
                  <Link to={"/reguser"}>
                    <button className="btn btn-outline-success me-4">
                      Sign up
                    </button>
                  </Link>
                </>
              ) : (

                <>
                  <NavItem img={myuser?.img ? myuser.img : userPlaceholder} navigate={navigate}>
                  </NavItem>
                </>
              )}
            </div>
          </div>
        </div>
        <div>     
        
          </div>            
      </nav>
    </>
  );
}


function NavItem(props) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef();
  const imgRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });
  return (
    <li className={dropMenu.nav_item}>
      <img
        src={props.img}
        alt="profilePhoto"
        className={dropMenu.icon_button}
        onClick={() => setOpen(!open)}
        ref={imgRef}
      />

      {open && (
        <div ref={menuRef} className={dropMenu.dropdown}>
          <DropdownMenu navigate={props.navigate} />
        </div>
      )}
    </li>
  );
}

function DropdownMenu(props) {
  const { navigate } = props;

  return (
    <>
      <Link to="/userpanel" className={dropMenu.menu_item}>
        Panel
        <AccountCircleIcon />
      </Link>
      <hr />
      <Link to={"#"}
        onClick={() => {
          localStorage.removeItem("jwt");
          navigate(0);
        }}
        className={dropMenu.menu_item}
      >
        Sign out
        <LogoutIcon />
      </Link>
    </>
  );
}
