import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty
} from 'class-validator';
import { ObjectId } from 'mongoose';


export class AddFriendDto {
    @ApiProperty()
    @IsNotEmpty()
    friend: ObjectId;
    
}