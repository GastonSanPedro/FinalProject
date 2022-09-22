import React, { useState } from "react";
import UserSearchCard from "./UserCardSearch";
import { Stack, Button, Text, Center } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const UserSearchContainer = () => {
    const [currentStart, setCurrentStart] = useState(0)
    const [currentEnd, setCurrentEnd] = useState(6)
    const [ button1, setButton1] = useState(true)
    const [ button2, setButton2] = useState(false)
   
    const searchUsers = useSelector((state)=> state.searchUser)
    const first6 = searchUsers.length > 6 ? searchUsers?.slice(currentStart,currentEnd) : searchUsers

     const handleClickFoward = () =>{

        if(currentStart >= 0) setButton1(false)

        setCurrentStart(currentStart+1)
        setCurrentEnd(currentEnd+1)
     }
     
     const handleClickBackward = () =>{

        if(currentStart <= 1) setButton1(true)
        setCurrentStart(currentStart-1)
        setCurrentEnd(currentEnd-1)
     }


    return(
        <>
        <Stack position={'fixed'} top={'15%'} left={'18%'} direction='row' w='80%' maxW={'79%'} display='flex' justifyContent='space-between' p={3} m={3} backgroundColor={'rgba(229, 191, 124, 0.3)'} borderRadius={3}>
        <Stack direction='row'>
        {
            searchUsers.length > 8 ? <Button disabled={button1} onClick={() => handleClickBackward()} h='150px' mr={0.7} w={0} fontSize='sm'>⪡</Button> : null
        }
        { searchUsers.length
            ? first6.map(user =>{
                return(
                    
                        <UserSearchCard
                            firstName={user.firstName}
                            lastName={user.lastName}
                            img={user.image}
                            email={user.email}/>
                )
                })
            : <Center h={10}><Text fontSize='md' color={'white'}>Ups... The user you are looking for does not exist</Text></Center>}
        </Stack>
        {
            searchUsers.length > 8 ? <Button disabled={button2} onClick={() =>handleClickFoward()} h='150px' w={0} fontSize='sm'>⪢</Button> : null
        }
              
        </Stack>
        </>
    )
}

export default UserSearchContainer