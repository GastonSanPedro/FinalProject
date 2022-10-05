import { Box, Text } from "@chakra-ui/react";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import SidebarWithHeader from "../components/Sidebar-Navbar/SideBar";
import NavbarSerch from "../components/NavbarSearch/NavbarSearch";
import ContainerSearchCard from "../components/UserSearch/ContainerSearchCard";
import PostSearchContainer from "../components/PostSearch/ContainerPostSearch";
import { RiFileTextLine, RiUserSearchLine, RiUserFollowLine } from 'react-icons/ri'
import { AiOutlinePicture } from 'react-icons/ai';

const SearchPage = () =>{

    const myUser = useSelector((state)=> state.myUser)
    const friends = useSelector((state)=> state.friends)
    const word = useSelector((state) => state.searchPost)
    const myFollowers = useSelector((state) => state.followers)

    const [state, setState ] = useState('users')

    const NAV_ITEMS = [
        {
          label: 'Users',
          icon: <RiUserSearchLine/>,
          onClick: () => {
            setState('users')}
        },
        {
            label: 'Following',
            icon: <RiUserFollowLine/>,
            onClick: () => {
              setState('following')
            }
          },
        {
            label: 'Followers',
            icon: <RiUserFollowLine/>,
            onClick: () => {
              setState('followers')
            }
          },
        {
          label: 'Images',
          icon: <AiOutlinePicture/>,
          onClick: () => {
            setState('images')}
        },
        {
          label: 'Text',
          icon: <RiFileTextLine/>,
          onClick: () => {
            setState('text')}
        }
     
      ];

    return(
        <>
        <SidebarWithHeader myUser={myUser} friends={friends}  myFollowers={myFollowers}/>
        <Box
           pos={'absolute'}
           top={'20%'}
           left={'0%'}
           textAlign={'center'}
           justifyContent={'center'}
           direction={'column'}
           width={'172vh'}
           height={'80vh'}
           mt={'6%'}
           ml={'18%'}
           mr={'7%'}>
        <NavbarSerch
            state={state}
            setState={setState}
            NAV_ITEMS={NAV_ITEMS}/>
        {
            state === 'users' || state === 'following' || state === 'followers' ? (
                <ContainerSearchCard
                state={state}
                myUser={myUser}
                word={word}
                friends={friends}
                myFollowers={myFollowers}/>
            ):(
                <PostSearchContainer
                    state={state}
                    word={word}
                />
            )
        }
      
        </Box>
        </>
    )
}

export default SearchPage