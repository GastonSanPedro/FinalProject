import { Box, Flex, Avatar, Text, Input, Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { postComentWall } from '../../redux/action';
import ModalFeed from "./ModalFeed";
import ProfileFeedComent from "./ProfileFeedComent";
import { RiMailSendLine } from "react-icons/ri";


const ProfileFeed = ({myUser, user, site}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  const handleChange = (e) => { 
    setInput(
      e.target.value
    )}


  const handleSubmit = ()=> {
    dispatch(postComentWall({description: input, author: myUser._id}, user._id, site))
    setInput('')
  }
 
  const preview = user?.wall?.slice(0,4)
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
          onChange={(e)=>handleChange(e)}
          ml={'2%'}
          variant={'flushed'}
          w={'75%'}
          value={input}
        />
        
        <Button
        onClick={()=>handleSubmit()}
        w={'10vh'}
        alignContent={'baseline'}
        variant={'unstyled'}
        fontWeight={'normal'}
        rightIcon={<RiMailSendLine/>}
        _hover={{
          bg: 'logo.2',
          color: 'white'
        }}
        >Post</Button>
        </Box>
        <HStack
        spacing={2}
        display={'flex'} 
        flexDir={'column'} 
        mt={'2vh'} 
        mr={'4vh'}
        w={'95%'} 
        maxH={'30vh'} minH={'30vh'} >
          
          {
           preview?.map((post, i) =>{
              return(
                <Box ml={i === 0? '1.3%' : null} w={'100%'} key={i}>
                <ProfileFeedComent
                  description={post.description}
                  firstName={post.author.firstName}
                  lastName={post.author.lastName}
                  avatar={post.author.image}
                   />
                </Box>
              )
            })
          }
          
        </HStack>
        <Box w={'100%'}>
        <ModalFeed user={user}/>
        </Box>
        </Flex>
        
      </Box>
    </>

  )
}

export default ProfileFeed
