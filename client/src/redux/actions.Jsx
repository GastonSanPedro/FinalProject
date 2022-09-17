import axios from 'axios';

export async function getUsers() {
    try {
        let info = await axios.get('http://localhost:3001/users', {})
        
        dispatch({
            type: 'GET_USERS',
            payload: info.data
        })
    } catch (error) {
        console.log(error, 'Error al llamar a la api');
    }
}

export async function getPosts() {
    try {
        let info = await axios.get('http://localhost:3001/posteos', {})
        
        dispatch({
            type: 'GET_POSTS',
            payload: info.data
        })
    } catch (error) {
        console.log(error, 'Error al llamar a la api');
    }
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