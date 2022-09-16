export interface User {
    mongo_id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,    
}

export interface State {
    users: User[]
}

export type ActionUsers = {
    type: string,
    payload?: User[]
}

