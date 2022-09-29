import { Avatar, Box } from "@chakra-ui/react"


const UserPics = ({myUser}) => {
    const {image, fullName} = myUser
    return (
        <>
        <Box 
        display={'flex'}
        ml={'10%'}
        mt={'5%'}
        w={'50vh'}
        alignItems={'center'}
        justifyContent={'center'}
        pl={10}
        pr={10}
        pt={4}
        pb={4}>
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