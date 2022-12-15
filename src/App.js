import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Confirm from "./Components/Functionality/AuthService";
import PetDetail from "./Components/Functionality/Details/PetDetail";
import ServiceDetail from "./Components/Functionality/Details/ServiceDetail";
import Profile from "./Components/Functionality/Details/UserDetail";
import VetDetail from "./Components/Functionality/Details/VetDetail";
import FormHistoryPet from "./Components/Functionality/Forms/HistoryPet";
import Login from "./Components/Functionality/Forms/Login";
import FormPet from "./Components/Functionality/Forms/Pet";
import FormUser from "./Components/Functionality/Forms/User";
import FormVet from "./Components/Functionality/Forms/Vet";
import NavBar from "./Components/Functionality/Navbar/index";
import AdminServiceDetail from "./Components/Functionality/PanelAdmin/AllServices/AdminServiceDetail";
import PanelAdmin from "./Components/Functionality/PanelAdmin/Body/PanelAdmin";
import AdminProfileDetail from "./Components/Functionality/PanelAdmin/Users/Detail";
import AdminVetDetail from "./Components/Functionality/PanelAdmin/VetInformation/VetDetail";
import Payment from "./Components/Functionality/Payment";
import ErrorPay from "./Components/Functionality/Payment/ErrorPay";
import SuccesPay from "./Components/Functionality/Payment/SuccessPay";
import ChooseVetTurn from "./Components/Functionality/Turns/ChooseVetTurn";
import UserPanel from "./Components/Functionality/UserPanel/Body/UserPanel";
import ErrorPath from "./Components/View/ErrorPath";
import ErrorSearch from "./Components/View/HomeFake/ErrorSearch";
import Home from "./Components/View/HomeFake/HomeFake";
import { getMyUser } from "./Redux/actions";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyUser());
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vet/:id" element={<VetDetail />} />
        <Route path="/pet/:id" element={<PetDetail />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/service/:servId/turn" element={<ChooseVetTurn />} />
        <Route exact path="/reguser" element={<FormUser />} />
        <Route exact path="/formdescrip" element={<FormHistoryPet />} />
        <Route exact path="/pet/register" element={<FormPet />} />
        <Route exact path="/vet/register" element={<FormVet />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/mp" element={<Payment />} />
        <Route path="/user/:id" element={<AdminProfileDetail />} />
        <Route path="/serv/:id" element={<AdminServiceDetail />} />
        <Route path="/adminvet/:id" element={<AdminVetDetail />} />
        <Route path="/admin/*" element={<PanelAdmin />} />
        <Route path="/confirm/:confirmationCode" element={<Confirm />} />
        <Route path="/userpanel/*" element={<UserPanel />} />
        <Route path="/errorPay" element={<ErrorPay />} />
        <Route path="/successPay" element={<SuccesPay />} />
        <Route path="/errorSearch" element={<ErrorSearch/>}/>
        <Route path="*" element={<ErrorPath/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
