import { State, ActionUsers} from './types'

const initialState = {
    users: []
}

export default function rootReducer (state = initialState, action:any) {
    switch (action.type) {
        case 'GET_USERS':
            return{
              ...state,
              users: action.payload 
            }
        default:
            return state
    } 

}

