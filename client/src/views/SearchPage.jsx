import { Box } from "@chakra-ui/react";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import SidebarWithHeader from "../components/Sidebar-Navbar/SideBar";
import NavbarSerch from "../components/NavbarSearch/NavbarSearch";
import ContainerSearchCard from "../components/UserSearch/ContainerSearchCard";
import PostSearchContainer from "../components/PostSearch/ContainerPostSearch";




const SearchPage = () =>{

    const myUser = useSelector((state)=> state.myUser)
    const [state, setState ] = useState('users')

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
            setState={setState}/>
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