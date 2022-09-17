import {GET_POSTS} from "./actions"


interface User {
    mongo_id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,    
}

interface Post{
    ID: number,
    user_ID: number,
    description:string
}

interface State {
    users: User[],
    posts:Post[]
}

type Action = {
    type: string,
    payload?: any
}

const initialState = {
    users:[],
    posts:[]

}

// function getProductReducer(state: state = initialState, action: action): state {

function rootReducer (state: State = initialState, action: Action):State  {
    switch (action.type) {
        case GET_POSTS:
            return{
              ...state,
              posts: action.payload 
            }
        default:
            return state
    } 

}

