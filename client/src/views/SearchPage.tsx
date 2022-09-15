import { Box } from "@chakra-ui/react";
import React from "react";
import HashtagContainer from "../components/HashtagSearch/HashtagContainer";
import UserSearchContainer from "../components/UserSearch/UserSearchContainer";
import Navbar from '../components/navbar/Navbar'

const SearchPage = () =>{
    return(
        <>
        <Navbar/>
        <UserSearchContainer/>
        <HashtagContainer/>
        </>
    )
}

export default SearchPage