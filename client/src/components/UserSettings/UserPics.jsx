import { Avatar, Box } from "@chakra-ui/react";



const UserPics = ({myUser, input, setInput}) => {
    const {image, fullName} = myUser
    
    return (
        <>
        <Box 
        display={'flex'}
        ml={'10%'}
        mt={'2%'}
        w={'50vh'}
        alignItems={'center'}
        justifyContent={'center'}
        pl={'8vh'}
        pr={'8vh'}
        pt={'4vh'}
        pb={'4vh'}>
        <Box
        w={'50%'}>
            
        </Box>
        <Avatar
            bg={'logo.3'}
            fontSize={'10rem'}
            size={'full'}
            src={image}
            name={fullName}/>
        </Box>
        </>
    )
}

export default UserPics