import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/users/schema/user-schema';
import { AddFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './schema/friend-schema';

@Injectable()
export class FriendsService {
  constructor(
  @InjectModel(User.name)
    private readonly userModel: Model<User>,
  @InjectModel(Friend.name)
    private readonly friendModel: Model<Friend>,

  ) {}

  async create(addFriendDto: AddFriendDto): Promise<Friend> {
   try {
      const friend:any = await this.friendModel.create(addFriendDto);
      let user: User = await this.userModel.findById(addFriendDto.idUser);
      let userFriend : User = await this.userModel.findById(addFriendDto.idFriend)
      userFriend.followers.push(user)
      userFriend.save()
      user.friends.push(friend)
      user.save()
      return friend

    } catch (error) {  
      console.log(error)
      if(error.code === 11000){ //si consologeamos el error nos va a mostrar tanto la propiedad code, como la propiedad keyValue
        throw new BadRequestException(`Friend exist in db ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Friend - check server logs`)
    }
  }

  async findAllFriendsByUser(idUser: string) {
    if(isValidObjectId(idUser)){
      const user =  await this.userModel.findById(idUser)
      .populate({ path: 'friends.idFriend', select:'-posts -password -friends -bio'})
      .exec()
      return user.friends.filter((el)=>el.idFriend !== null)
      // .filter((el=>el.idUser))
      
    }
  }

  async findAllFollowersByUser(idUser: string) {
    if(isValidObjectId(idUser)){
      const user =  await this.userModel.findById(idUser)
      return user.followers.filter((el)=> el._id !== null)
    }
  }

  async findAllFollowersAndFriendsByUser(idUser: string) {
  const all = []

  const allFollowers = await this.findAllFollowersByUser(idUser)
    allFollowers.forEach(user => {
      all.push(user._id.toString())
    });

  const allFriends = await this.findAllFriendsByUser(idUser)
    allFriends.map(user => {
      all.push(user.idFriend._id.toString())})

  const newSet = [... new Set(all)]
  
  let friendFollower = []

  for (let i = 0; i < newSet.length; i++) {
  let user = await this.userModel.findById(newSet[i])
    friendFollower.push(user)
  }
  return friendFollower
 }


  async findAllPostOfMyFriends (idUser: string){
    if(isValidObjectId(idUser)){
      const user =  await this.userModel.findById(idUser)
      .populate({ 
        path: 'friends.idFriend', 
        select:'posts', 
        populate:{ 
          path:'posts.author', 
          select:'-posts -password -friends -bio -followers'}})
      .exec() 

      const friendsPost: any = user.friends.map(friend => friend.idFriend)
      const friendsPostAll = friendsPost.map(friend => friend.posts).flat()

    return friendsPostAll
    } 
  }

  async removeFriend(idUser: string, idFriend: string) {
    // const idFriend = updateFriendDto.idFriend
    const user: User = await this.userModel.findById(idUser);
    // const friendDelete:Friend = await this.friendModel.findOne({idFriend});
    const userFriend: User = await this. userModel.findById(idFriend)
    
    userFriend.followers = userFriend.followers.filter(follower => follower._id.toString() !== idUser)
    userFriend.save()
    
    user.friends = user.friends.filter(friend => friend.idFriend.toString() !== idFriend.toString())
    user.save()
    // await friendDelete.deleteOne()
    return `Friend ${idFriend} has been deleted`;
  }

}

