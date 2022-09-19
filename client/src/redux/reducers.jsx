import { GET_USERS, GET_POSTS, POST_USER, AUTH_USER, SEARCH_USER, SEARCH_POST } from "./actions"

const initialState = {
    allUsers: [],
    users:[],
    posts:[],
    auth: {
      auth:false,
    },
    searchUser:[],
    searchPost:[]
  }

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        allUsers: action.payload,
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

    case AUTH_USER:
      return {
        ...state,
        auth: action.payload,
      }
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
