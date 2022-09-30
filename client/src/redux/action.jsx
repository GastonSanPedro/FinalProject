import axios from 'axios';
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const GET_POSTS = 'GET_POSTS';
export const SINGLE_POST = 'SINGLE_POST';
export const CLEAN_SINGLE_POST = 'CLEAN_SINGLE_POST';
export const POST_COMMENT = 'POST_COMMENT';
export const POST_REACTION = 'POST_REACTION';
export const POST_USER = 'POST_USER';
export const CREATE_USER_POST = 'CREATE_USER_POST';
export const CREATE_USER = 'CREATE_USER';
export const SEARCH_USER = 'SEARCH_USER';
export const SEARCH_POST = 'SEARCH_POST';
export const AUTH_USER = 'AUTH_USER';
export const CLEAN_AUTH_USER = 'CLEAN_AUTH_USER';
export const LOG_OUT = 'LOG_OUT';
export const CHANGE_DATA_PROFILE = 'CHANGE_DATA_PROFILE';
export const GET_MY_USER = 'GET_MY_USER';
export const ADD_FRIEND = 'ADD_FRIEND';

export function getUsers() {
  return async function (dispatch) {
    try {
      let info = await axios.get('/users', {});

      dispatch({
        type: GET_USERS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error, 'Error');
    }
  };
}

export function getUser(email) {
  return async function (dispatch) {
    try {
      let info = await axios.get(`/users/${email}`);
      dispatch({
        type: GET_USER,
        payload: info.data,
      });
    } catch (error) {
      console.log(error, 'holis');
    }
  };
}

export function getMyUser(email) {
  return async function (dispatch) {
    try {
      let info = await axios.get(`/users/${email}`, {});
      dispatch({
        type: GET_MY_USER,
        payload: info.data,
      });
    } catch (error) {
      console.log(error, 'Error al llamar a la api');
    }
  };
}

export function getPosts() {
  return async function (dispatch) {
    try {
      let info = await axios.get(`/posts/`);
      //      console.log({ info });
      dispatch({
        type: GET_POSTS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error, 'Error al llamar a la api');
    }
  };
}
export function getSinglePosts(id) {
  return async function (dispatch) {
    try {
      let info = await axios.get(`/posts/id/${id}`);
      // let data = info.data.comments.map(async (comment) => {
      //   //console.log(comment);
      //   let user = await axios.get(`/users/${comment.idUser}`);
      //   comment.fullName = user.data.fullName;
      // });
      //console.log(data);
      dispatch({
        type: SINGLE_POST,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function cleanSinglePost() {
  return async function (dispatch) {
    try {
      dispatch({
        type: SINGLE_POST,
        payload: [],
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postComment(payload, id) {
  return async function (dispatch) {
    try {
      const info = await axios.post(`/comments`, payload);
      let data = await axios.get(`/posts/id/${id}`);
      //console.log(data.data);
      return dispatch({
        type: POST_COMMENT,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postReaction(payload, idPost, idComment) {
  return async function (dispatch) {
    try {
      const info = await axios.post(`/comments/${idComment}`, payload);
      let data = await axios.get(`/posts/id/${idPost}`);
      //console.log(data.data);
      return dispatch({
        type: POST_REACTION,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function createUserPost(inputPost) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post('/posts', inputPost);
      return dispatch({
        type: CREATE_USER_POST,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createUser(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post('/users', payload);
      return dispatch({
        type: CREATE_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchUser(searcher) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/users/name/${searcher}`);
      return dispatch({
        type: SEARCH_USER,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: SEARCH_USER,
        payload: [],
      });
    }
  };
}

export function searchPost(searcher) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SEARCH_POST,
        payload: searcher,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const authUser = (mail, password, google) => {
  return async function (dispatch) {
    try {
      if (google === undefined) {
        var user = await axios.get(`/users/${mail}`);
        let formatUser = user.data;
        console.log(formatUser);
        if (formatUser.password !== password) {
          return dispatch({
            type: AUTH_USER,
            payload: { auth: false, reason: 'Usuario o contraseña no válidos' },
          });
        } else {
          return dispatch({
            type: AUTH_USER,
            payload: { auth: true, user: formatUser },
          });
        }
      } else if (google) {
        var user = await axios.get(`/users/${mail}`);
        if (user) {
          console.log(google);
          let formatUser = user.data;
          return dispatch({
            type: AUTH_USER,
            payload: { auth: true, user: formatUser },
          });
        }
      }
    } catch (error) {
      if (error.response.data.statusCode === 404) {
        if (!google) {
          console.log(error);
          return dispatch({
            type: AUTH_USER,
            payload: { auth: false, reason: 'Usuario o contraseña no válidos' },
          });
        } else {
          console.log(google);
          return dispatch({
            type: AUTH_USER,
            payload: { auth: 'unregistered', user: google },
          });
        }
      }
    }
  };
};
export function cleanAuthUser() {
  return async function (dispatch) {
    return dispatch({
      type: CLEAN_AUTH_USER,
      payload: { auth: '' },
    });
  };
}
//reason: error.response.data.message

export function changeDataProfile(payload, email) {
  return async function (dispatch) {
    try {
      var user = await axios.patch(`/users/${email}`, payload);
      console.log(user);
      let info = await axios.get(`/users/${email}`);
      return dispatch({
        type: CHANGE_DATA_PROFILE,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function logOut() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: LOG_OUT,
        payload: { auth: false },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addFriend(myUserid, anyUserId) {
  const idAnyUser = { friend: anyUserId };
  return async function (dispatch) {
    try {
      let info = await axios.post(`/users/friend/${myUserid}`, idAnyUser);
      let { data } = await axios.get(`/users/${myUserid}`);
      console.log(data);
      return dispatch({
        type: ADD_FRIEND,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
