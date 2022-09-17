import { Action } from '@remix-run/router';
import axios from 'axios';
export const GET_POSTS = "GET_POSTS"

// export function getUsers() {
//     return async function (dispatch: any) {
//         try {
//             var json = await axios.get('hhtp://localhost:3001/users')
//             return dispatch({
//                 type: 'GET_USERS',
//                 payload: json.data
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

export const getPosts = (): any => async (dispatch: any): Promise<any> => {

    try {

        var jsona = await axios.get('http://localhost:3001/posteos')
        let json = await jsona.data


        dispatch({
            type: 'GET_POSTS',
            payload: json
        });

    } catch (error) {
        console.log(error, 'error al llamar a la api');
    }
}