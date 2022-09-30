import { PartialType } from '@nestjs/swagger';
import { AddFriendDto } from './create-friend.dto';

export class UpdateFriendDto extends PartialType(AddFriendDto) {
    
}
