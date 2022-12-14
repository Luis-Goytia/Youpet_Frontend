import axios from "axios";
import {
  ADD_FAVORITES,
  CLEAR_DETAILS,
  CLEAR_TURN,
  CREATE_PET,
  CREATE_SERVICE,
  CREATE_TURN,
  CREATE_VET,
  DELETE_PET,
  DELETE_SERVICE,
  DELETE_TURN,
  DELETE_VET,
  FILTER_SERVICE,
  GET_All_TURN,
  GET_MYUSER,
  GET_PAYMENT_MP,
  GET_PETS,
  GET_PET_DETAIL,
  GET_SERVICES,
  GET_SERVICE_BY_NAME,
  GET_SERVICE_DETAIL,
  GET_TURN,
  GET_USER_TURN,
  GET_USERS,
  GET_USER_BY_EMAIL,
  GET_USER_BY_NAME,
  GET_USER_DETAIL,
  GET_VETS,
  GET_VET_BY_NAME,
  GET_VET_DETAIL,
  UPDATE_SERVICE,
  UPDATE_USER,
  UPDATE_USER_BYPANEL,
  UPDATE_VET,
  GET_USER_PETS,
  REMOVE_PET,
  CANCEL_TURN
} from "./const";
const instance = axios.create({
  baseURL: "https://youpet-production.up.railway.app",
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
export function getUserPets(UserId) {
  return async function (dispatch) {
    let json = await instance.get(`/pet/user/${UserId}`);
    return dispatch({
      type: GET_USER_PETS,
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


export function clearCreatePet() {
  return async function (dispatch) {
    let json = "nada" ;
    return dispatch({
      type: CREATE_PET,
      payload: json,
    });
  };
}

export function createPet(payload) {
  return async function (dispatch) {
    let json = "" ;
    try {
      await instance.post("/pet", payload);
      json = "ok"
    } catch (error) {
      json = "error"
    }

    
    return dispatch({
      type: CREATE_PET,
      payload: json,
    });
  };
}

export function deletePet(id) {
  return async function (dispatch) {
    var json = await axios.delete(`/pet/${id}`);
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
    let json = await axios.post("/vet", payload);
    return dispatch({
      type: CREATE_VET,
      payload: json.data,
    });
  };
}

export function updateVet(id, payload) {
  return async function (dispatch) {
    var json = await axios.put(`/vet/${id}`, payload);
    return dispatch({
      type: UPDATE_VET,
      payload: json.data,
    });
  };
}

export function deleteVet(id) {
  return async function (dispatch) {
    var json = await axios.delete(`/vet/${id}`);
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
    let json = await axios.post("/service", payload);
    return dispatch({
      type: CREATE_SERVICE,
      payload: json.data,
    });
  };
}

export function updateService(id, payload) {
  return async function (dispatch) {
    var json = await axios.put(`/service/${id}`, payload);
    return dispatch({
      type: UPDATE_SERVICE,
      payload: json.data,
    });
  };
}

export function deleteService(id) {
  return async function (dispatch) {
    var json = await axios.delete(`/service/${id}`);
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

export function updateUser(id, payload) {
  return async function (dispatch) {
    var json = await instance.put(`/user/${id}`, payload);
    return dispatch({
      type: UPDATE_USER,
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
    return dispatch({
      type: GET_TURN,
      payload: json.data,
    });
  };
}


export function getAllTurn(payload) {
  return async function (dispatch) {
    let json = await axios.get(`/turn/`);
    return dispatch({
      type: GET_All_TURN,
      payload: json.data,
    });
  };
}

export function deleteTurn(id) {
  return async function (dispatch) {
    var json = await axios.delete(`/turn/${id}`);
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

export function getPaymentMP(service) {
  return async function (dispatch) {
    let json = await instance.post(
      `/payment/mp/552525`,
      service
    );
    return dispatch({
      type: GET_PAYMENT_MP,
      payload: json.data,
    });
  };
}

export function addFavorites(id, userid) {
  return async function (dispatch) {
    let json = await axios.post(`/vet/addFavorite`, {
      id,
      userid,
    });
    return dispatch({
      type: ADD_FAVORITES,
      payload: json.data
    })
  }
}


export function removeFav(id, userid) {
  return async function (dispatch) {
    let json = await axios.post(`/vet/removeFavorite`, {
      id,
      userid,
    });
    return dispatch({
      type: GET_VET_DETAIL,
      payload: json.data,
    });
  };
}


export function clearUpdateUserByPanel() {
  return async function (dispatch) {
    let json = "nada" ;
    return dispatch({
      type: UPDATE_USER_BYPANEL,
      payload: json,
    });
  };
}

export function updateUserByPanel(payload, id) {
  return async function (dispatch) {
    let json = "" ;
    try {
      await instance.put(`/user/${id}`, payload);
      json = "ok"
    } catch (error) {
      json = "error"
    }
    return dispatch({
      type: UPDATE_USER_BYPANEL,
      payload: json,
    });
  };
}
export function clearRemovePet() {
  return async function (dispatch) {
    let json = "nada" ;
    return dispatch({
      type: REMOVE_PET,
      payload: json,
    });
  };
}

export function removePetUser(id) {
  return async function (dispatch) {
    let json = "" ;
    try {
      await instance.delete(`/pet/${id}`);
      json = "ok"
    } catch (error) {
      json = "error"
    }
    return dispatch({
      type: REMOVE_PET,
      payload: json,
    });
  };
}


export function getUserTurns(id) {
  return async function (dispatch) {
    let json = await instance.get(`/turn/user/${id}`);
    return dispatch({
      type: GET_USER_TURN,
      payload: json.data,
    });
  };
}


export function clearCancelTurnUser() {
  return async function (dispatch) {
    let json = "nada" ;
    return dispatch({
      type: CANCEL_TURN,
      payload: json,
    });
  };
}

export function cancelTurnUser(id) {
  return async function (dispatch) {
    let json = "" ;
    try {
      await instance.delete(`/turn/${id}`);
      json = "ok"
    } catch (error) {
      json = "error"
    }
    return dispatch({
      type: CANCEL_TURN,
      payload: json,
    });
  };
}