import { Box,Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import UserSearchContainer from "../components/UserSearch/UserSearchContainer";
import SidebarWithHeader from "../components/Sidebar-Navbar/SideBar";
import TextPostContainer from "../components/TextPost/TextPostContainer";



const SearchPage = () =>{
    const word = useSelector((state) => state.searchPost)
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
        
        <TextPostContainer
        word={word}
        site={'search'}/>
        </Box>
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