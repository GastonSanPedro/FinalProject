import React, { useEffect } from "react";
import { getUsers, createUser } from "../../redux/actions";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { Center, Box, FormControl, Input, FormLabel, InputGroup, InputRightElement, Text, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";


const CreateUser = () => {
        const dispatch = useDispatch()
        const allUsers = useSelector((state) => state.allUsers)
        const navigate = useNavigate()

        const [show, setShow] = React.useState(false)
        const handleClick = () => setShow(!show)

        useEffect(()=>{
          dispatch(getUsers())
        }, [dispatch])



    return(
        <>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                password: '',
                email: '',
                userName: ''
              }}
              validate={(values) => {
                let errores = {}
                if(!values.email){ 
                  errores.email= 'Please enter your email'
                }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)){
                    errores.email='e.g.: exaemail@leafme.com'
                }
                if(!values.firstName){ 
                  errores.firstName= 'Please enter your name'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.firstName)){
                  errores.firstName='The name can only contain letters and spaces'
                }
                if(!values.lastName){ 
                  errores.lastName= 'Please enter your last name'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastName)){
                  errores.lastName='The last name can only contain letters and spaces'
                }
                if(!values.userName){ 
                  errores.userName= 'Please create an user name'
                }
                if(!values.password){ 
                  errores.password= 'Please create a password'
                }
                return errores
              }}
              onSubmit={(values, actions) => {

                const emailFilter = allUsers.filter(user => values.email === user.email)
                if(emailFilter[0]) return alert('This email is already in use')

                const usernameFilter = allUsers.filter(user => values.userName === user.userName)
                if(usernameFilter[0]) return alert('This username already exist')

                dispatch(createUser(values), [])
                navigate(`/profile`)
                               

                console.log('Formulario Enviado')
              }}
            >
              {({handleBlur, handleChange, handleSubmit, values, errors, touched}) => (
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
                        { touched.email && errors.email && <Text color='red.300' size='xxs' >{errors.email}</Text>}
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
                        { touched.firstName &&  errors.firstName && <Text color='red.300' size='xs' >{errors.firstName}</Text>}
                    
                    <FormControl>
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
                        { touched.lastName && errors.lastName && <Text color='red.300' size='xs' >{errors.lastName}</Text>}
                    </FormControl>

                    <FormControl>
                      <FormLabel 
                        htmlFor='userName'>User name</FormLabel>
                      <Input 
                        type='text' 
                        id='userName' 
                        name='userName' 
                        placeholder='User Name' 
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        { touched.userName && errors.userName && <Text color='red.300' size='xs' >{errors.userName}</Text>}
                    </FormControl>
                    
                    <FormControl >
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
                      {  touched.password && errors.password && <Text color='red.300' size='xs' >{errors.password}</Text>}

                    </FormControl>
                    <Button
                        type='submit' 
                        mt='10px'
                        onSubmit={handleSubmit} >Create Account</Button>
                      
                    
                        
                    
                  </Form>
                  </Box>
                </Center>
              )}
       
            </Formik>

        </>
    )
}

export default CreateUser


