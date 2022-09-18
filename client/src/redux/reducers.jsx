import {
  GET_USERS,
  GET_USER,
  GET_POSTS,
  POST_USER,
  AUTH_USER,
  SEARCH_USER,
  SEARCH_POST,
  LOG_OUT,
} from './actions';

const initialState = {
<<<<<<< HEAD
    allUsers: [],
    users:[],
    posts:[],
    auth: {},
}
=======
  allUsers: [],
  users: [],
  user: [],
  posts: [],
  auth: {
    auth: '',
  },
};
>>>>>>> dev

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
      const usersSearch = action.payload;
      if (!usersSearch[0]) {
        return {
          ...state,
          usersSearch: '1',
        };
      } else
        return {
          ...state,
          searchUser: action.payload,
        };
    case SEARCH_POST:
      const postSearch = action.payload;
      if (!postSearch[0]) {
        return {
          ...state,
          usersPost: '1',
        };
      } else
        return {
          ...state,
          searchPost: action.payload,
        };

    default:
      return state;
  }
}
