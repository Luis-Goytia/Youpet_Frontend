import {
  CLEAR_DETAILS,
  CLEAR_TURN,
  CREATE_ADMIN,
  CREATE_SERVICE,
  CREATE_TURN,
  CREATE_VET,
  DELETE_ADMIN,
  DELETE_PET,
  DELETE_SERVICE,
  DELETE_TURN,
  DELETE_VET,
  FILTER_SERVICE,
  GET_ADMINS,
  GET_ADMIN_BY_NAME,
  GET_ADMIN_DETAIL,
  GET_All_TURN,
  GET_MYUSER, GET_PAYMENT_MP, GET_PETS,
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
  GET_VET_DETAIL,
  UPDATE_ADMIN
} from "./const";

const initialState = {
  pets: [],
  allPets: [],
  petDetail: [],
  vets: [],
  allVets: [],
  vetDetail: [],
  medDiag: [],
  turns: [],
  allTurns: [],
  turn: [],
  vetTurns: [],
  createdTurn: [],
  services: [],
  serviceDetail: [],
  createService: [],
  user: [],
  users: [],
  allUsers: [],
  userDetail: [],
  admins: [],
  allAdmins: [],
  adminDetail: [],
  allServices: [],
  paymentLink: {}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PETS:
      return {
        ...state,
        pets: action.payload,
        allPets: action.payload,
      };
    case GET_PET_DETAIL:
      return {
        ...state,
        petDetail: action.payload,
      };
    case DELETE_PET:
      const deletePet = state.allPets;
      return {
        ...state,
        pets: deletePet.filter((pet) => pet.id !== action.payload),
      };
    case GET_VETS:
      return {
        ...state,
        vets: action.payload,
      };
    case GET_VET_DETAIL:
      return {
        ...state,
        vetDetail: action.payload,
      };
    case GET_VET_BY_NAME:
      return {
        ...state,
        vets: action.payload,
      };
    case CREATE_VET:
      return {
        ...state,
        vets: [],
      };
    case DELETE_VET:
      const deleteVet = state.allVets;
      return {
        ...state,
        vets: deleteVet.filter((vet) => vet.id !== action.payload),
      };
    case GET_SERVICES:
      return {
        ...state,
        services: action.payload,
        allServices: action.payload,
      };
    case GET_SERVICE_DETAIL:
      return {
        ...state,
        serviceDetail: action.payload,
      };
    case GET_SERVICE_BY_NAME:
      return {
        ...state,
        services: action.payload,
      };
    case CREATE_SERVICE:
      return {
        ...state,
        services: [],
      };
    case DELETE_SERVICE:
      const deleteService = state.allServices;
      return {
        ...state,
        services: deleteService.filter(
          (service) => service.id !== action.payload
        ),
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case GET_USER_BY_NAME:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_BY_EMAIL:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };
    case GET_ADMIN_DETAIL:
      return {
        ...state,
        adminDetail: action.payload,
      };
    case GET_ADMIN_BY_NAME:
      return {
        ...state,
        admins: action.payload,
      };
    case CREATE_ADMIN:
      return {
        ...state,
        admins: [],
      };
    case DELETE_ADMIN:
      const deleteAdmin = state.allAdmins;
      return {
        ...state,
        admins: deleteAdmin.filter((admin) => admin.id !== action.payload),
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        adminDetail: state.adminDetail.map((admin) =>
          admin.id === action.payload.id ? action.payload : admin
        ),
      };
    case FILTER_SERVICE:
      const allservices = state.allServices;
      const filter =
        action.payload === ""
          ? allservices
          : allservices.filter(
            (r) => r.type.toLowerCase() === action.payload.toLowerCase()
          );
      return {
        ...state,
        services: filter,
      };
    case CLEAR_DETAILS:
      return {
        ...state,
        vetDetail: [],
        petDetail: [],
        serviceDetail: [],
        userDetail: [],
        adminDetail: [],
      };
    case CREATE_TURN:
      return {
        ...state,
        createdTurn: [action.payload],
      };
    case GET_TURN:
      return {
        ...state,
        turn: [action.payload],
      };
    case GET_All_TURN:
      return {
        ...state,
        turns: action.payload,
        allTurns: action.payload,
      };
    case DELETE_TURN:
      const deleteTurn = state.allTurns;
      return {
        ...state,
        turns: deleteTurn.filter((c) => c.id !== action.payload),
      };
    case CLEAR_TURN:
      return {
        ...state,
        turn: [],
        createdTurn: [],
      };
    case GET_PAYMENT_MP:
      return {
        ...state,
        paymentLink: action.payload,
      };
    case GET_MYUSER:
      return {
        ...state,
        myuser: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
