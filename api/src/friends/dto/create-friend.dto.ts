import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AddFriendDto {
    @ApiProperty()
    @IsNotEmpty()
    idFriend: ObjectId;

    @ApiProperty()
    @IsNotEmpty()
    idUser: ObjectId;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isDeleted: Boolean
    
}