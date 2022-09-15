import axios from 'axios';

export function getUsers(){
    return async function(dispatch:Function){
        try{
            var json = await axios.get('hhtp://localhost:3001/users')
            return dispatch({
                type: 'GET_USERS',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}