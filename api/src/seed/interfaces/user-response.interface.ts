

export interface UserResponse {
    users: IUser[];
}

export interface IUser {
    firstName: string;
    lastName:  string;
    userName:  string;
    email:     string;
    password:  string;
    image:     string;
    birthdate: string;
    posteos: IPosteos []

}

export interface IPosteos{
    pics?: string,
    description: string,
}
