import axios from 'axios';
export const GET_USERS = 'GET_USERS';
export const GET_POSTS = 'GET_POSTS';
export const POST_USER = 'POST_USER';

export function getUsers() {
  return async function (dispatch) {
    try {
      let info = await axios.get('http://localhost:3001/users', {});

      dispatch({
        type: GET_USERS,
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
      let info = await axios.get('http://localhost:3001/posteos', {});

      dispatch({
        type: GET_POSTS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error, 'Error al llamar a la api');
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
