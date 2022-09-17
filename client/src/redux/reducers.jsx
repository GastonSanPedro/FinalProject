import { GET_USERS, GET_POSTS, POST_USER } from "./actions"

const initialState = {
    allUsers: [],
    users:[],
    posts:[]
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                allUsers: action.payload
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case POST_USER:
            return {
                ...state
            }
        
        default:
            return state
    }
}