import axios from 'axios';
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const GET_POSTS = 'GET_POSTS';
export const POST_USER = 'POST_USER';
export const CREATE_USER_POST = 'CREATE_USER_POST';
export const SEARCH_USER = 'SEARCH_USER';
export const SEARCH_POST = 'SEARCH_POST';
export const AUTH_USER = 'AUTH_USER';
export const LOG_OUT = 'LOG_OUT';

export function getUsers() {
  return async function (dispatch) {
    try {
      let info = await axios.get('http://localhost:3001/users', {});

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
      let info = await axios.get(`http://localhost:3001/users/${email}`, {});

      dispatch({
        type: GET_USER,
        payload: info.data,
      });
    } catch (error) {
      console.log(error, 'holis');
    }
  };
}

export function getPosts(email) {
  return async function (dispatch) {
    try {
      let info = await axios.get(`http://localhost:3001/users/${email}`, {});
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
      var json = await axios.patch(
        `http://localhost:3001/users/${user}`,
        payload
      );
      return dispatch({
        type: CREATE_USER_POST,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createUser(payload) {
  return async function () {
    try {
      var json = await axios.post('http://localhost:3001/users', payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchUser(searcher) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/users/name/${searcher}`
      );
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

export const authUser = (mail, password) => {
  return async function (dispatch) {
    try {
      var user = await axios.get(`http://localhost:3001/users/${mail}`);
      let formatUser = user.data;
      //console.log(formatUser);
      if (formatUser.password !== password) {
        return dispatch({
          type: AUTH_USER,
          payload: { auth: false, reason: 'Contraseña incorrecta' },
        });
      } else {
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
          payload: { auth: false, reason: error.response.data.message },
        });
      }
    }
  };
};

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

//----------TYPSCRIPT FUNCIONALpor si las dudas---------
// export const getPosts = (): any => async (dispatch: any): Promise<any> => {

//     try {

//         var jsona = await axios.get('http://localhost:3001/posteos')
//         let json = await jsona.data

//         dispatch({
//             type: 'GET_POSTS',
//             payload: json
//         });

//     } catch (error) {
//         console.log(error, 'error al llamar a la api');
//     }
// }

//----------TYPSCRIPT FUNCIONALpor si las dudas---------
// export const getPosts = (): any => async (dispatch: any): Promise<any> => {

//     try {

//         var jsona = await axios.get('http://localhost:3001/posteos')
//         let json = await jsona.data

//         dispatch({
//             type: 'GET_POSTS',
//             payload: json
//         });

//     } catch (error) {
//         console.log(error, 'error al llamar a la api');
//     }
// }
