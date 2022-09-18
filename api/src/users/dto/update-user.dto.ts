import { PartialType } from '@nestjs/mapped-types';
import { Iposteos } from 'src/seed/interfaces/user-response.interface';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    posteos?: Iposteos[]
}
