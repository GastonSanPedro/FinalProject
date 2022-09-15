import React from "react";
import { Link } from "react-router-dom";
import { Center, Box, FormControl, Input, FormLabel, FormErrorMessage, FormHelperText, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

const CreateUser = () => {

        const [show, setShow] = React.useState(false)
        const handleClick = () => setShow(!show)

    return(
        <>
        <Center>
        <Box w='400px' m='60px'>
            
        <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input placeholder='First name' />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Last name</FormLabel>
            <Input placeholder='Last Name' />
        </FormControl>
        <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup >
            <Input
                pr='70px'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
            />
            <InputRightElement width='70px'>
            <Button h='30px' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
            </Button>
            </InputRightElement>
        </InputGroup>
        </FormControl>
        <Link to='/profile'><Button mt='10px' >Create Account</Button></Link>
        </Box>
        </Center>
        </>
    )
}

export default CreateUser


