import axios from "axios";
import {
  ADD_FAVORITES, CLEAR_DETAILS,
  CLEAR_TURN, CREATE_ADMIN, CREATE_PET, CREATE_SERVICE, CREATE_TURN, CREATE_USER, CREATE_VET, DELETE_ADMIN, DELETE_PET, DELETE_SERVICE, DELETE_TURN, DELETE_VET, FILTER_SERVICE, GET_ADMINS,
  GET_ADMIN_BY_NAME,
  GET_ADMIN_DETAIL, GET_All_TURN, GET_MYUSER, GET_PAYMENT_MP,
  GET_PETS,
  GET_PET_DETAIL,
  GET_SERVICES,
  GET_SERVICE_BY_NAME,
  GET_SERVICE_DETAIL,
  GET_TURN,
  GET_USERS,
  GET_USER_BY_EMAIL,
  GET_USER_BY_NAME,
  GET_USER_DETAIL,
  GET_VETS,
  GET_VET_BY_NAME,
  GET_VET_DETAIL, UPDATE_ADMIN,
  UPDATE_SERVICE, UPDATE_TURN, UPDATE_USER, UPDATE_VET
} from "./const";
const instance = axios.create({
  baseURL: "http://localhost:3001",
});
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function getPets() {
  return async function (dispatch) {
    let json = await instance.get("/pet");
    return dispatch({
      type: GET_PETS,
      payload: json.data,
    });
  };
}

export function getPetDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/pet/${id}`);
    return dispatch({
      type: GET_PET_DETAIL,
      payload: json.data,
    });
  };
}

export function createPet(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/admin", payload);
    return dispatch({
      type: CREATE_PET,
      payload: json.data,
    });
  };
}

export function deletePet(id) {
  return async function (dispatch) {
    var json = await axios.delete(`http://localhost:3001/pet/${id}`);
    return dispatch({
      type: DELETE_PET,
      payload: json.data,
    });
  };
}

export function getVets() {
  return async function (dispatch) {
    let json = await instance.get("/vet");
    return dispatch({
      type: GET_VETS,
      payload: json.data,
    });
  };
}

export function getVetsDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/vet/${id}`);
    return dispatch({
      type: GET_VET_DETAIL,
      payload: json.data,
    });
  };
}
export function getVetByName(name) {
  return async function (dispatch) {
    let json = await instance.get(`/vet?name=${name}`);
    return dispatch({
      type: GET_VET_BY_NAME,
      payload: json.data,
    });
  };
}

export function createVet(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/vet", payload);
    return dispatch({
      type: CREATE_VET,
      payload: json.data,
    });
  };
}

export function updateVet(id) {
  return async function (dispatch) {
    var json = await axios.put(`http://localhost:3001/vet/${id}`);
    return dispatch({
      type: UPDATE_VET,
      payload: json.data,
    });
  };
}

export function deleteVet(id) {
  return async function (dispatch) {
    var json = await axios.delete(`http://localhost:3001/vet/${id}`);
    return dispatch({
      type: DELETE_VET,
      payload: json.data,
    });
  };
}

export function getServices() {
  return async function (dispatch) {
    let json = await instance.get("/service");
    return dispatch({
      type: GET_SERVICES,
      payload: json.data,
    });
  };
}

export function getServiceByName(name) {
  return async function (dispatch) {
    let json = await instance.get(`/service?name=${name}`);
    return dispatch({
      type: GET_SERVICE_BY_NAME,
      payload: json.data,
    });
  };
}

export function getServiceDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/service/${id}`);
    return dispatch({
      type: GET_SERVICE_DETAIL,
      payload: json.data,
    });
  };
}
export function createService(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/service", payload);
    return dispatch({
      type: CREATE_SERVICE,
      payload: json.data,
    });
  };
}

export function updateService(id) {
  return async function (dispatch) {
    var json = await axios.put(`http://localhost:3001/service/${id}`);
    return dispatch({
      type: UPDATE_SERVICE,
      payload: json.data,
    });
  };
}

export function deleteService(id) {
  return async function (dispatch) {
    var json = await axios.delete(`http://localhost:3001/service/${id}`);
    return dispatch({
      type: DELETE_SERVICE,
      payload: json.data,
    });
  };
}

export function getUsers() {
  return async function (dispatch) {
    let json = await instance.get("/user");
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    });
  };
}
export function getMyUser() {
  return async function (dispatch) {
    let json = await instance.get("/user/myuser");
    return dispatch({
      type: GET_MYUSER,
      payload: json.data,
    });
  };
}

export function getUserDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/user/${id}`);
    return dispatch({
      type: GET_USER_DETAIL,
      payload: json.data,
    });
  };
}

export function getUserByName(name) {
  return async function (dispatch) {
    let json = await instance.get(`/user?name=${name}`);
    return dispatch({
      type: GET_USER_BY_NAME,
      payload: json.data,
    });
  };
}

export function getUserByEmail(email) {
  return async function (dispatch) {
    let json = await instance.get(`/user/log/${email}`);
    return dispatch({
      type: GET_USER_BY_EMAIL,
      payload: json.data,
    });
  };
}

export function createUser(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/admin", payload);
    return dispatch({
      type: CREATE_USER,
      payload: json.data,
    });
  };
}

export function updateUser(id) {
  return async function (dispatch) {
    var json = await axios.put(`http://localhost:3001/user/${id}`);
    return dispatch({
      type: UPDATE_USER,
      payload: json.data,
    });
  };
}

export function getAdmins() {
  return async function (dispatch) {
    let json = await instance.get("/admin");
    return dispatch({
      type: GET_ADMINS,
      payload: json.data,
    });
  };
}

export function getAdminDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/admin/${id}`);
    return dispatch({
      type: GET_ADMIN_DETAIL,
      payload: json.data,
    });
  };
}
export function getAdminByName(name) {
  return async function (dispatch) {
    let json = await instance.get(`/admin?name=${name}`);
    return dispatch({
      type: GET_ADMIN_BY_NAME,
      payload: json.data,
    });
  };
}

export function createAdmin(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/admin", payload);
    return dispatch({
      type: CREATE_ADMIN,
      payload: json.data,
    });
  };
}

export function updateAdmin(id) {
  return async function (dispatch) {
    var json = await axios.delete(`http://localhost:3001/admin/${id}`);
    return dispatch({
      type: UPDATE_ADMIN,
      payload: json.data,
    });
  };
}

export function deleteAdmin(id) {
  return async function (dispatch) {
    var json = await axios.delete(`http://localhost:3001/admin/${id}`);
    return dispatch({
      type: DELETE_ADMIN,
      payload: json.data,
    });
  };
}

export function createTurn(payload) {
  return async function (dispatch) {
    let json = await instance.post("/turn", payload);
    return dispatch({
      type: CREATE_TURN,
      payload: json.data,
    });
  };
}

export function getTurn(payload) {
  const { vetSelect, servId } = payload;
  return async function (dispatch) {
    let json = await instance.get(`/turn/${vetSelect}/${servId}`);

    //let json = await axios.get(
    //`http://localhost:3001/turn/${vetSelect}/${servId}`
    //);

    return dispatch({
      type: GET_TURN,
      payload: json.data,
    });
  };
}

export function getAllTurn(payload) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/turn/`);
    return dispatch({
      type: GET_All_TURN,
      payload: json.data,
    });
  };
}

export function updateTurn(id) {
  return async function (dispatch) {
    var json = await axios.delete(`http://localhost:3001/turn/${id}`);
    return dispatch({
      type: UPDATE_TURN,
      payload: json.data,
    });
  };
}

export function deleteTurn(id) {
  return async function (dispatch) {
    var json = await axios.delete(`http://localhost:3001/turn/${id}`);
    return dispatch({
      type: DELETE_TURN,
      payload: json.data,
    });
  };
}

export function clearTurn() {
  return {
    type: CLEAR_TURN,
    payload: [],
  };
}

export function clearDetails() {
  return {
    type: CLEAR_DETAILS,
    payload: [],
  };
}

export function filterService(payload) {
  return {
    type: FILTER_SERVICE,
    payload,
  };
}

// export function filterVets(payload) {
//   return {
//     type: FILTER_VETS,
//     payload
//   };
// }

export function getPaymentMP(service) {
  return async function (dispatch) {
    //let json = await axios.post(`http://localhost:3001/payment/mp/552525`,service);
    let json = await instance.post(`http://localhost:3001/payment/mp/552525`, service);
    return dispatch({
      type: GET_PAYMENT_MP,
      payload: json.data,
    });
  };
}

export function addFavorites(id, userid) {
  return async function (dispatch) {
    let json = await axios.post(`http://localhost:3001/vet/addFavorite`, { id, userid })
    return dispatch({
      type: ADD_FAVORITES,
      payload: json.data
    })
  }
}
