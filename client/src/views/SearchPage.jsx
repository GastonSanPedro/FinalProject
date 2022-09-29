import { Box } from "@chakra-ui/react";
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
    const [state, setState ] = useState('users')

    const NAV_ITEMS = [
        {
          label: 'Users',
          icon: <RiUserSearchLine/>,
          onClick: () => {
            setState('users')}
        },
        {
            label: 'Friends',
            icon: <RiUserFollowLine/>,
            onClick: () => {
              setState('friends')
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
        <SidebarWithHeader/>
        <Box
           pos={'absolute'}
           top={'20%'}
           left={'0%'}
           textAlign={'center'}
           justifyContent={'center'}
           direction={'column'}
           width={'79vw'}
           height={'80vh'}
           mt={'7%'}
           ml={'18%'}
           mr={'7%'}>
        <NavbarSerch
            state={state}
            setState={setState}
            NAV_ITEMS={NAV_ITEMS}/>
        {
            state === 'users' || state === 'friends' ? (
                <ContainerSearchCard
                state={state}
                myUser={myUser}/>
            ):(
                <PostSearchContainer
                    state={state}
                />
            )
        }
      
        </Box>
        </>
    )
}

export default SearchPage