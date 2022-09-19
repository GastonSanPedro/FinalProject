import {
  AUTH_USER,
  CREATE_USER_POST,
  GET_POSTS,
  GET_USER,
  GET_USERS,
  LOG_OUT,
  POST_USER,
  SEARCH_POST,
  SEARCH_USER,
} from './actions';

const initialState = {
  allUsers: [],
  users: [],
  user: [],
  posts: [],
  auth: {
    auth: '',
  },
    searchUser:[],
    searchPost:[]
  };

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        allUsers: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case POST_USER:
      return {
        ...state,
      };
    case CREATE_USER_POST:
      return {
        ...state,
      };
    case AUTH_USER:
      return {
        ...state,
        auth: action.payload,
        user: action.payload.user,
      };
    case LOG_OUT:
      return {
        ...state,
        auth: action.payload,
        user: [],
      };
    case SEARCH_USER:

          return {
            ...state,
            searchUser: action.payload
            }   

    case SEARCH_POST:
      return {
              ...state,
              searchPost: action.payload
            }
      
        default:
          return state;
  }}
