import {
  CLEAR_DETAILS,
  CLEAR_TURN,
  CREATE_SERVICE,
  CREATE_TURN,
  CREATE_VET,
  CREATE_PET,
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
  UPDATE_VET,
  UPDATE_USER_BYPANEL,
  REMOVE_PET,
  GET_USER_PETS,
  CANCEL_TURN
} from "./const";

const initialState = {
  pets: [],
  allPets: [],
  petDetail: [],
  createPet:["nada"],
  updateUserByPanel:["nada"],
  removePet:["nada"],
  cancelTurn:["nada"],
  userPets:[],
  turnsUser:[],
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
  user: [],
  users: [],
  allUsers: [],
  userDetail: [],
  allServices: [],
  paymentLink: {},
  myuser: [],
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
    case UPDATE_VET:
      return {
        ...state,
        vets: state.vets.map((vet) =>
          vet.id === action.payload.id ? action.payload : vet
        ),
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
    case UPDATE_SERVICE:
      return {
        ...state,
        services: state.services.map((service) =>
          service.id === action.payload.id ? action.payload : service
        ),
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
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
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
    case CREATE_PET:
        return {
          ...state,
          createPet: [action.payload],
        };
    case UPDATE_USER_BYPANEL:
        return {
          ...state,
          updateUserByPanel: [action.payload],
        };
    case GET_USER_PETS:
        return {
          ...state,
          userPets: action.payload,
        };
    case GET_USER_TURN:
        return {
          ...state,
          turnsUser: action.payload,
        };
    case CANCEL_TURN:
        return {
          ...state,
          cancelTurn: [action.payload],
        };
    case REMOVE_PET:
        return {
          ...state,
          removePet: [action.payload],
        };
    default:
      return state;
  }
}

export default rootReducer;
