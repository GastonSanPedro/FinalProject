import { Box,Text } from "@chakra-ui/react";
import React from "react";
import HashtagContainer from "../components/HashtagSearch/HashtagContainer";
import UserSearchContainer from "../components/UserSearch/UserSearchContainer";
import Navbar from '../components/navbar/Navbar'
import UserCard from '../components/UserCard/UserCard'
import FriendsContainer from "../components/Friends/FriendsContainer";
import PostSearchContainer from "../components/PostSearch/ContainerPostSearch";
import SidebarWithHeader from "../components/Sidebar-Navbar/SideBar";


const SearchPage = () =>{
    return(
        <>
        <SidebarWithHeader/>
        {/* <Navbar/>
        <Box display='flex' dir='column' pt={10} pr={10} pl={10} >
        
        <Box>
        <UserSearchContainer/>
        <HashtagContainer/>
        </Box>
        <UserCard /> 
        
        </Box>
        <Box display='flex' dir='column' pt={5} pr={10} pl={10}  >
         <PostSearchContainer/>
        <FriendsContainer/>
        </Box>
         */}
        </>
    )
}

export default SearchPage