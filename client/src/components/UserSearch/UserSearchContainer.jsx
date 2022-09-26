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
        <Stack
        display='flex'  
        direction='row' 
        maxW='100%' 
        mt={'2%'}
        mb={'3%'}
        justifyContent='center'
        borderRadius={3}
        bg={'rgba(229, 191, 124, 0.3)'}
        minH={280}>
        <Stack direction='row'>
        {
            searchUsers.length > 6 
            ? <Button 
                borderRadius={2}
                alignSelf={'center'}
                bg={'logo.3'}
                color={'white'}
                disabled={button1} 
                onClick={() => handleClickBackward()} 
                h={10} 
                w={0} 
                fontSize='sm'
                _hover={{
                    bg: 'rgba(140, 161, 116, 0.5)'
                }}
                _active={{

                }}>⪡</Button> : null
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
            : <Center h={10}><Text justifySelf={'center'} fontSize='md' color={'black'}>Ups... The user you are looking for does not exist</Text></Center>}
        </Stack>
        {
            searchUsers.length > 6 
            ? <Button
                borderRadius={2}
                alignSelf={'center'}
                bg={'logo.3'}
                color={'white'}
                disabled={button2} 
                onClick={() =>handleClickFoward()} 
                h={10}
                w={0} 
                fontSize='sm'
                _hover={{
                    bg: 'rgba(140, 161, 116, 0.5)'
                }}>⪢</Button> : null
        }
              
        </Stack>
        </>
    )
}

export default UserSearchContainer