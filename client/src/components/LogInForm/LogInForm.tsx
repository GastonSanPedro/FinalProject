import React from "react";
import { Link } from "react-router-dom";
import { Tooltip, Center, Box, FormControl, Input, FormLabel, FormErrorMessage, FormHelperText, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

const CreateUser = () => {

        const [show, setShow] = React.useState(false)
        const [input, setInput] = React.useState('')

        const handleShowClick = () => setShow(!show)
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)
        const isError = input === '' //true or false 

    return(
        <>
        <Center>
        <Box w='400px' m='60px'>
            
        <FormControl isInvalid={isError}>
            <FormLabel>Email address</FormLabel>
            <Input 
            type='email'
            value={input}
            onChange={handleInputChange}/>
        </FormControl>
        <FormControl isInvalid={isError}>
        <FormLabel>Password</FormLabel>
        <InputGroup >
            <Input
                pr='70px'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
            />
            <InputRightElement width='70px'>
            <Button h='30px' size='sm' onClick={handleShowClick}>
            {show ? 'Hide' : 'Show'}
            </Button>
            </InputRightElement>
        </InputGroup>
        </FormControl>
        
        {!isError
        ?<Link to ='/profile'><Button  mt='10px' >Log In</Button></Link>
        :<Tooltip label='Please complete required information' shouldWrapChildren><Button isDisabled mt='10px' >Log In</Button></Tooltip>
        }
        
        </Box>
        </Center>
        
        </>
    )
}

export default CreateUser


