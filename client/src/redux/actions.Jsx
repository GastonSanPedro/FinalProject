import axios from 'axios';
export const GET_USERS = 'GET_USERS';
export const GET_POSTS = 'GET_POSTS';
export const POST_USER = 'POST_USER';
export const SEARCH_USER = 'SEARCH_USER';
export const SEARCH_POST = 'SEARCH_POST';
export const AUTH_USER = 'AUTH_USER';


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

export function searchUser(searcher) {
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/users/name/${searcher}`)
            return dispatch({
                type: SEARCH_USER,
                payload: json.data
            })
        }catch(error){
          return dispatch({
            type: SEARCH_USER,
            payload: []
        })
        }}}

export function searchPost(searcher){
    return async function(dispatch){
        try{
           
            return dispatch({
                type: SEARCH_POST,
                payload: searcher
            })
        }catch(error){
            console.log(error)
        }
    }
        }

export const authUser = (mail, password) => {
  return async function (dispatch) {
    try {
      var user = await axios.get(`http://localhost:3001/users/${mail}`);
      let formatUser = user.data;
      //console.log(formatUser);
      if (formatUser.email !== mail) {
        return dispatch({ 
          type: AUTH_USER, 
          payload: {auth: false}
        });
      } else if (formatUser.password !== password) {
        return dispatch({
          type: AUTH_USER,
          payload: { auth: false},
        });
      } else {
        return dispatch({
          type: AUTH_USER,
          payload: { auth: true, user: user },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

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
