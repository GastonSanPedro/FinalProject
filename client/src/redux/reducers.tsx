interface User {
    mongo_id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,    
}

interface State {
    users: User[]
}

type Action = {
    type: string,
    payload?: unknown
}

const initialState = {
  
}

const rootReducer = (state = initialState, action: Action) => {
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

export default rootReducer