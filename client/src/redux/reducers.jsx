import {
  AUTH_USER,
  CLEAN_AUTH_USER,
  CREATE_USER_POST,
  GET_MY_USER,
  GET_POSTS,
  SINGLE_POST,
  POST_COMMENT,
  POST_REACTION,
  CLEAN_SINGLE_POST,
  GET_USER,
  GET_USERS,
  CREATE_USER,
  LOG_OUT,
  POST_USER,
  SEARCH_POST,
  SEARCH_USER,
  CHANGE_DATA_PROFILE,
  ADD_FRIEND,
  REPORT_POST,
  DELETE_POST,
  GET_FRIENDS,
  GET_FOLLOWERS,
  DELETE_FRIENDS,
  SEARCH_FRIENDS,
  CREATE_PAYMENT
} from './action';

const initialState = {
  allUsers: [],
  users: [],
  user: [],
  myUser: [],
  posts: [],
  singlePost: [],
  auth: {
    auth: '',
  },
  searchFriends: [],
  searchUser: [],
  searchPost: [],
  uploadedImage: [],
  friends: [],
  followers: [],
  payment: [],
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
    case GET_MY_USER:
      return {
        ...state,
        myUser: action.payload,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case SINGLE_POST:
      return {
        ...state,
        singlePost: action.payload,
      };
    case POST_COMMENT:
      return {
        ...state,
        singlePost: action.payload,
      };
    case POST_REACTION:
      return {
        ...state,
        singlePost: action.payload,
      };
    case CLEAN_SINGLE_POST:
      return {
        ...state,
        singlePost: action.payload,
      };
    case POST_USER:
      return {
        ...state,
      };
    case CREATE_USER_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        myUser: {
          ...state.myUser,
          posts: [...state.myUser.posts, action.payload],
        },
      };
    case CREATE_USER:
      return {
        ...state,
        myUser: action.payload,
      };
    case AUTH_USER:
      return {
        ...state,
        auth: action.payload,
        myUser: action.payload.user,
      };
    case CLEAN_AUTH_USER:
      return {
        ...state,
        auth: action.payload,
        myUser: [],
      };
    case LOG_OUT:
      return {
        ...state,
        auth: action.payload,
        myUser: [],
      };
    case SEARCH_USER:
      return {
        ...state,
        searchUser: action.payload,
      };
    case SEARCH_POST:
      return {
        ...state,
        searchPost: action.payload,
      };
    case CHANGE_DATA_PROFILE:
      return {
        ...state,
        myUser: action.payload,
      };
    case ADD_FRIEND:
      return {
        ...state,
        friends: action.payload,
      };
    case GET_FRIENDS:
        return{
          ...state,
          friends: action.payload,
          searchFriends: action.payload
      };
    case GET_FOLLOWERS:
      return{
        ...state,
        followers: action.payload
      }
    case SEARCH_FRIENDS:
      return{
        ...state,
        searchFriends: action.payload
      };
    case DELETE_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };
    case REPORT_POST:
      return {
        ...state,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts],
        myUser: {
          ...state.myUser,
          posts: [...state.myUser.posts],
        },
      };
    case CREATE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    default:
      return state;
  }
}
