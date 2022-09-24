import {
    IsNotEmpty
} from 'class-validator';
import { ObjectId } from 'mongoose';


export class AddFriendDto {
    @IsNotEmpty()
    idFriend: ObjectId;
    
}