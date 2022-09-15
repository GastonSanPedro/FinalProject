import { Box } from "@chakra-ui/react";
import React from "react";
import HashtagContainer from "../components/HashtagSearch/HashtagContainer";
import UserSearchContainer from "../components/UserSearch/UserSearchContainer";

const SearchPage = () =>{
    return(
        <>
        <Box backgroundColor='green.200'>Esto es el nav</Box>
        <UserSearchContainer/>
        <HashtagContainer/>
        </>
    )
}

export default SearchPage