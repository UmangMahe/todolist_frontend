import {
  AUTH_TOKEN,
  USER_INFO,
  AUTHENTICATED,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SIGNIN,
  AUTH_FAILED,
  SIGNOUT_RESET,
} from "../constants/Auth";

const initState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  signup: false,
  token: localStorage.getItem(AUTH_TOKEN),
  logout: false,
  currentUser: JSON.parse(localStorage.getItem(USER_INFO)),
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: "/",
        token: action.token,
        signup: false,
        currentUser: action.user,
      };
    case AUTH_FAILED:
      return {
        ...state,
        loading: false,
        token: null,
        currentUser: null,
      };
    case SHOW_AUTH_MESSAGE:
      return {
        ...state,
        message: action.message,
        showMessage: true,
        loading: false,
      };
    case HIDE_AUTH_MESSAGE:
      return {
        ...state,
        message: "",
        showMessage: false,
        loading: false,
      };
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        loading: false,
        showMessage: true,
        message: action.message,
        logout: true,
      };
    }
    case SIGNOUT_RESET: {
      return {
        ...state,
        logout: false,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        message: action.message,
        signup: true
      };
    }
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SIGNIN: {
      return {
        ...state,
        signup: false,
        logout: false,
      };
    }
    default:
      return state;
  }
};

export default auth;
