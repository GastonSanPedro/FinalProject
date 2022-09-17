import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { Center, Box, FormControl, Input, FormLabel, FormErrorMessage, FormHelperText, InputGroup, InputRightElement, Button, Text } from '@chakra-ui/react';
import { useDispatch, useSelector  } from "react-redux";


const CreateUser = () => {
        const dispatch = useDispatch()
        const allUsers = useSelector((state) => state.allUsers)

        const [show, setShow] = React.useState(false)
        const handleClick = () => setShow(!show)
        // const handleSubmit = (e) => {
        //     e.preventDefault()
        //     // const emailFilter = allUsers.filter( u => allUsers.email === Input.email)
        //     //if(emailF[0]) return alert('This email is already in use, please LOG IN')
        // }

    return(
        <>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                password: '',
                email: ''
              }}
              validate={(values) => {
                let errores = {}
                if(!values.firstName){ 
                  errores.firstName= 'Please enter your name'
                }
                return errores
              }}
              onSubmit={() => {
                console.log('Formulario Enviado')
              }}
            >
              {({handleBlur, handleChange, handleSubmit, values, errors}) => (
                <Center>
                  <Box w='400px' m='60px'>
                  <Form>
                    <FormControl>
                      <FormLabel 
                        htmlFor='email' >Email address</FormLabel>
                      <Input 
                        type='email' 
                        id='email' 
                        name='email' 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </FormControl>
                    
                    
                    <FormLabel htmlFor='firstName'>First name</FormLabel>
                      <Input 
                        type='text' 
                        id='firstName' 
                        name='firstName' 
                        placeholder='First name' 
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         />
                        { errors.firstName && <Text>{errors.firstName}</Text>}
                    
                    <FormControl isRequired>
                      <FormLabel 
                        htmlFor='lastName'>Last name</FormLabel>
                      <Input 
                        type='text' 
                        id='lastName' 
                        name='lastName' 
                        placeholder='Last Name' 
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel
                        htmlFor='password'>Password</FormLabel>
                      <InputGroup >
                        <Input
                          pr='70px'
                          type={show ? 'text' : 'password'}
                          id='password' 
                          name='password'
                          placeholder='Enter password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <InputRightElement width='70px'>
                          <Button h='30px' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                      
                    <Link to='/profile'>
                        <Button 
                        mt='10px'
                        onSubmit={handleSubmit} >Create Account</Button>
                    </Link>
                  </Form>
                  </Box>
                </Center>
              )}
       
            </Formik>

        </>
    )
}

export default CreateUser


