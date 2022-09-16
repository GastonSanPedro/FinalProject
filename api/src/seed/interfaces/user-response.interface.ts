

export interface UserResponse {
    users: User[];
}

export interface User {
    firstName: string;
    lastName:  string;
    userName:  string;
    email:     string;
    password:  string;
    image:     string;
    birthdate: string;
}
