import axios from 'axios';
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const GET_POSTS = 'GET_POSTS';
export const POST_USER = 'POST_USER';
export const CREATE_USER_POST = 'CREATE_USER_POST';
export const CREATE_USER = 'CREATE_USER';
export const SEARCH_USER = 'SEARCH_USER';
export const SEARCH_POST = 'SEARCH_POST';
export const AUTH_USER = 'AUTH_USER';
export const LOG_OUT = 'LOG_OUT';
export const CHANGE_DATA_PROFILE = 'CHANGE_DATA_PROFILE';
export const GET_MY_USER = 'GET_MY_USER';

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
      let info = await axios.get(`/users/${email}`, {});

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

export function getPosts(email) {
  return async function (dispatch) {
    try {
      let info = await axios.get(`/users/${email}`, {});
      //console.log(info.data.posteos);
      dispatch({
        type: GET_POSTS,
        payload: info.data.posteos,
      });
    } catch (error) {
      console.log(error, 'Error al llamar a la api');
    }
  };
}

export function createUserPost(user, payload) {
  return async function (dispatch) {
    try {
      //console.log(payload);
      var json = await axios.patch(`/users/${user}`, payload);
      let info = await axios.get(`/users/${user}`);
      console.log(info.data);
      return dispatch({
        type: CREATE_USER_POST,
        payload: info.data.posteos,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createUser(payload) {
  return async function () {
    try {
      var json = await axios.post('/users', payload);
      return json.info;
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
      if (google === false) {
        var user = await axios.get(`/users/${mail}`);
        let formatUser = user.data;
        //console.log(formatUser);
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
      } else {
        var user = await axios.get(`/users/${mail}`);
        let formatUser = user.data;
        return dispatch({
          type: AUTH_USER,
          payload: { auth: true, user: formatUser },
        });
      }
    } catch (error) {
      if (error.response.data.statusCode === 404) {
        console.log(error);
        return dispatch({
          type: AUTH_USER,
          payload: { auth: false, reason: 'Usuario o contraseña no válidos' },
        });
      }
    }
  };
};

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
