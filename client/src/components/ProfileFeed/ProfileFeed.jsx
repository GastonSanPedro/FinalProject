import { Box, Flex, Avatar, Text, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { useDispatch } from "react-redux";
import  { postComentWall } from '../../redux/action'



const ProfileFeed = ({myUser, user}) => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  const handleChange = (e) => { 
    setInput(
      e.target.value
    )}


  const handleSubmit = ()=> {
    dispatch(postComentWall({description: input, author: myUser._id}, user._id))
    setInput('')
  }
  console.log(user.wall, 'ProfileFeed')

  const navigate = useNavigate()
  return(
    <>
      <Box
        ml={'5vh'}
        h={'50vh'}
        w={'65%'}
        display={'flex'}
        backgroundColor={'white'}
        mb={'50px'}
        >
        <Box
        ml={'2%'}
        bg={`logo.2`}
        w={7}
        h={'50vh'}
        />
        <Flex 
          w={'100%'} 
          flexDir={'column'} 
          mt={'2vh'}
          ml={'2vh'}>
        <Flex
          onClick={()=>{navigate(`/profile`)}}
          align="center"
          w={'90%'}
          h={'5vh'}
          borderRadius="lg"
          role="group"
          cursor="pointer"
        >
        <Avatar
            size={'sm'}
            name={myUser?.firstName}
            src={myUser?.image}
            />
            <Text pl={2} fontSize={'1.4vw'} fontWeight={'bold'}> 
            {myUser?.firstName} {myUser?.lastName}
            </Text>
            <Text pl={2} fontSize={'1.1vw'} fontWeight={'light'} fontStyle={'italic'} color={'gray.500'}> 
            {myUser?.userName} 
            </Text>       
          
        </Flex>
        <Box>
        <Input
          ml={'2%'}
          variant={'flushed'}
          w={'80%'}
          onChange={ (e) => handleChange(e)}
          value= {input}
        />
        
        <Button
        onClick={()=> handleSubmit()}
        >Post</Button>
        </Box>
        </Flex>
        
      </Box>
    </>

  )
}

export default ProfileFeed
