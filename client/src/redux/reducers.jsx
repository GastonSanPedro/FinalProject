import { GET_USERS, GET_POSTS } from "./actions"

const initialState = {
    users:[],
    posts:[]
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state
    }
}