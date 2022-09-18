import { GET_USERS, GET_POSTS, POST_USER } from "./actions"

const initialState = {
    allUsers: [],
    users:[],
    posts:[]
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

      const usersSearch = action.payload
      if(!usersSearch[0]){
        return {
          ...state,
          usersSearch: '1'    
          }}else return {
            ...state,
            searchUser: action.payload
            }      
    case SEARCH_POST:
      const postSearch = action.payload
      if(!postSearch[0]){
        return{
            ...state,
            usersPost: '1'
            }}else return {
                ...state,
                searchPost: action.payload
            }
      
        default:
          return state;
  }}
