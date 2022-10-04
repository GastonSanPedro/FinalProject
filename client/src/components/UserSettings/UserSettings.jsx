import { Box, Button, Flex, Text } from "@chakra-ui/react";
import EditableForm from "./EditableForm";
import { AiOutlineDelete } from "react-icons/ai";


function randomNumber(min, max) {
  let a = Math.random() * (max - min) + min;
  return Math.floor(a);
}

export const ColorBox = () => {
  return(
    <Box 
      bg={`logo.${randomNumber(1, 4)}`} 
      w={10} 
      h={'6.1vh'}></Box>
  )
}

export const UserSettings = ({myUser, input, setInput, users}) => {

  const {firstName, lastName, userName, password, email} = myUser
    
  if(Object.entries(myUser).length){
        return(
          <>
          <Flex 
          flexDir="column"  
          ml={'2%'} 
          mt={'2%'}
          justify={'center'} 
          w={'50vh'}>
              <Flex 
              borderRadius={2} 
              align={'center'}>
                  <Flex   
                  m={'2% 0% 2% 2%'} 
                  p={'1% 1% 1% 2%'} 
                  align={'center'} 
                  justify={'space-between'} 
                  w={'100%'} 
                  bg={'white'} >
                    <Text>First Name:</Text>
                    <EditableForm 
                    val={firstName} 
                    name={'firstName'} 
                    email={email} 
                    input={input} 
                    setInput={setInput}
                    />
                  </Flex>
                  <ColorBox/>
              </Flex>
              <Flex 
              borderRadius={2} 
              align={'center'}>
                  <Flex   
                  m={'2% 0% 2% 2%'}  
                  p={'1% 1% 1% 2%'} 
                  align={'center'} 
                  justify={'space-between'} 
                  w={'100%'} 
                  bg={'white'}
                   >
                    <Text>Last Name:</Text>
                    <EditableForm 
                    val={lastName} 
                    name={'lastName'}
                    email={email}  
                    input={input} 
                    setInput={setInput}
                    />
                  </Flex>
                  <ColorBox/>
                </Flex>
                <Flex 
                borderRadius={2} 
                align={'center'}>
                    <Flex   
                     m={'2% 0% 2% 2%'}  
                    p={'1% 1% 1% 2%'} 
                    align={'center'} 
                    justify={'space-between'} 
                    w={'100%'} 
                    bg={'white'} 
                    >
                    <Text>Username:</Text>
                    <EditableForm
                    email={email}  
                    val={userName} 
                    input={input}
                    name={'username'} 
                    setInput={setInput}
                    users={users.map((user)=> user.userName)}/>
                    </Flex>
                    <ColorBox/>
                </Flex>
                <Flex 
                borderRadius={2} 
                align={'center'}>
                    <Flex  
                    m={'2% 0% 2% 2%'} 
                    p={'1% 1% 1% 2%'} 
                    align={'center'} 
                    justify={'space-between'} 
                    w={'100%'} 
                    bg={'white'} 
                    >
                    <Text>Password:</Text>
                    <EditableForm 
                    val={password} 
                    input={input}
                    email={email}  
                    setInput={setInput}
                    name={'password'}
                    />
                    </Flex>
                    <ColorBox/>
                </Flex>
                <Flex 
                borderRadius={2} 
                align={'center'}>
                    <Flex   
                    m={'2% 0% 2% 2%'}  
                    align={'center'} 
                    justify={'space-between'} 
                    w={'100%'} 
                    bg={'white'} >
                      <Button
                      rightIcon={<AiOutlineDelete/>} 
                      w={'100%'}
                      h={'7vh'} 
                      bg={'none'}
                      fontStyle={'none'}
                      fontWeight={'normal'}
                      borderRadius={2}
                      _hover={{
                        color: 'white',
                        bg: 'logo.3' 
                    }}>Delete your account?</Button>
                </Flex>
                <Box bg={`logo.3`} w={10} h={'7vh'}></Box>
                </Flex>
                </Flex>
            </>
        )
    }else return(
            <>
            <p>Loading...</p>
            </>
        )}
