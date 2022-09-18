import { Box } from "@chakra-ui/react";
import React from "react";
import HashtagContainer from "../components/HashtagSearch/HashtagContainer";
import UserSearchContainer from "../components/UserSearch/UserSearchContainer";
import Navbar from '../components/navbar/Navbar'
import UserCard from '../components/UserCard/UserCard'
import FriendsContainer from "../components/Friends/FriendsContainer";

const SearchPage = () =>{
    return(
        <>
        <Navbar/>
        <Box display='flex' dir='column' pt={10} pr={10} pl={10} >
        
        <Box>
        <UserSearchContainer/>
        <HashtagContainer/>
        </Box>
        <UserCard/>
        
        </Box>
        <Box display='flex' dir='column' pt={5} pr={10} pl={10}  >
        <Box  w='945px' borderRadius='7px' display='flex' justifyContent='space-between' p={3} m={3} backgroundColor={"gray.300"}></Box>
        <FriendsContainer/>
        </Box>
        
        </>
    )
}

export default SearchPage