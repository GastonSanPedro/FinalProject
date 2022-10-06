import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Iposteos } from 'src/seed/interfaces/user-response.interface';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    // @ApiProperty()
    // @IsOptional()
    // @IsNotEmpty()
    // posteos?: Iposteos[]
    @ApiProperty()
    @IsOptional()
    isDeleted: Boolean
}
