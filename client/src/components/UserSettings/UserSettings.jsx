import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import EditableForm from "./EditableForm"
import { AiOutlineDelete } from "react-icons/ai"


const UserSettings = ({myUser}) => {

    function randomNumber(min, max) {
        let a = Math.random() * (max - min) + min;
        return Math.floor(a);
      }

    if(Object.entries(myUser).length){
        return(
            <>
            <Flex flexDir="column"  ml={'5%'} mt={'5%'}justify={'center'} w={'50vh'}>
               
                <Flex borderRadius={2} align={'center'}>
                <Box bg={`logo.${randomNumber(1, 4)}`} w={10} h={'6.1vh'}></Box>
                <Flex   m={'2% 2% 2% 0%'} p={'1% 1% 1% 2%'} align={'center'} justify={'space-between'} w={'100%'} bg={'white'} >
                    <Text>First Name:</Text>
                    <EditableForm value={myUser.firstName}/>
                </Flex>
                </Flex>
                <Flex borderRadius={2} align={'center'}>
                <Box bg={`logo.${randomNumber(1, 4)}`} w={10} h={'6.1vh'}></Box>
                <Flex   m={'2% 2% 2% 0%'} p={'1% 1% 1% 2%'} align={'center'} justify={'space-between'} w={'100%'} bg={'white'} >
                    <Text>Last Name:</Text>
                    <EditableForm value={myUser.lastName}/>
                </Flex>
                </Flex>
                <Flex borderRadius={2} align={'center'}>
                <Box bg={`logo.${randomNumber(1, 4)}`} w={10} h={'6.1vh'}></Box>
                <Flex   m={'2% 2% 2% 0%'} p={'1% 1% 1% 2%'} align={'center'} justify={'space-between'} w={'100%'} bg={'white'} >
                    <Text>Username:</Text>
                    <EditableForm value={myUser.userName}/>
                </Flex>
                </Flex>
                <Flex borderRadius={2} align={'center'}>
                <Box bg={`logo.${randomNumber(1, 4)}`} w={10} h={'6.1vh'}></Box>
                <Flex  m={'2% 2% 2% 0%'} p={'1% 1% 1% 2%'} align={'center'} justify={'space-between'} w={'100%'} bg={'white'} >
                    <Text>Password:</Text>
                    <EditableForm value={myUser.password} />
                </Flex>
                </Flex>
                <Flex borderRadius={2} align={'center'}>
                <Box bg={`logo.3`} w={10} h={'7vh'}></Box>
                <Flex  m={'2% 2% 2% 0%'} align={'center'} justify={'space-between'} w={'100%'} bg={'white'} >
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
                </Flex>
                </Flex>
            </>
        )
    }else{
        return(
            <>
            <p>Loading...
            ESTO DESPUES SE VA A CAMBIAR POR UN COMPONENTE LOADING, ES MOMENTANEO
            </p>
            </>
        )
    }
   
    
}

export default UserSettings