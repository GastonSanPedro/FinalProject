import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authUser, createUser, getUsers } from '../../redux/action';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Flex,
} from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import imgBackground from '../../assets/landing-pic.jpg';
const imagenB = imgBackground;

const CreateUser = ({ logOrSign, setlogOrSign }) => {
  const google = window.google;
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [User, setUser] = React.useState('');

  const handleClick = () => setShow(!show);
  const handleCallbackResponse = (response) => {
    console.log('Encoded JWT ID token:' + response.credential);
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    //dispatch(authUser(userObject.email, null, true));
  };
  useEffect(() => {
    /* global google */
    dispatch(getUsers());
    setTimeout(function () {
      google?.accounts.id.initialize({
        client_id:
          '239100653667-9cg4th0msle8b1fsvkgn7mbnae69msom.apps.googleusercontent.com',
        callback: handleCallbackResponse,
      });
      google?.accounts.id.renderButton(document.getElementById('signInDiv'), {
        theme: 'outlined',
        type: 'icon',
        size: 'large',
      });
    });
  }, [dispatch]);
  
  const valEmail = (inputValueEmail) => {
    const emailF = allUsers.filter((user) => inputValueEmail === user.email);
    console.log(allUsers)
      if(emailF[0])return true;
      else return false;
      }
  const valUsername = (inputValueUsername) => {
    const usernameF = allUsers.filter(user=> inputValueUsername === user.userName);
    if(usernameF[0]) return true;
    else return false;
  }
  return (
    <>
      <Formik
        initialValues={{
          firstName: User ? User?.given_name : '',
          lastName: User ? User?.family_name : '',
          password: '',
          email: User ? User?.email : '',
          userName: '',
        }}
        validate={(values) => {

          let errores = {};
          if (!values.email && !User) {
            errores.email = 'Please enter your email';
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            ) &&
            !User
          ) {
            errores.email = 'e.g.: exaemail@leafme.com';
          }else if(valEmail(values.email)){
            errores.email = 'Email in use';
          }
          if (!values.firstName && !User) {
            errores.firstName = 'Please enter your name';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.firstName) && !User) {
            errores.firstName = 'The name can only contain letters and spaces';
          }
          if (!values.lastName && !User) {
            errores.lastName = 'Please enter your last name';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastName) && !User) {
            errores.lastName =
              'The last name can only contain letters and spaces';
          }
          if (!values.userName) {
            errores.userName = 'Please create an user name';
          }else if(valUsername(values.userName)){
            errores.userName = 'Username in use, please create another one'
          }
          if (!values.password) {
            errores.password = 'Please create a password';
          } else if (values.password.length < 6) {
            errores.password = 'Password must be longer than 6 characters';
          }
          return errores;
        }}
        onSubmit={(values, actions) => {
          const emailFilter = allUsers.filter(
            (user) => values.email === user.email
          );
          const usernameFilter = allUsers.filter(
            (user) => values.userName === user.userName
          );
          
          if (emailFilter[0]) return alert('This email is already in use');

         
          if (usernameFilter[0]) return alert('This username already exist');
          if (User) {
            const googleUser = {
              firstName: User?.given_name,
              lastName: User?.family_name,
              email: User?.email,
              password: values.password,
              userName: values.userName,
            };
            dispatch(createUser(googleUser), []);
            localStorage.setItem('user', JSON.stringify(googleUser));
            navigate(`/home`);
            console.log('Formulario Enviado');
          } else {
            dispatch(createUser(values), []);
            localStorage.setItem('user', JSON.stringify(values));
            navigate(`/home`);
            console.log('Formulario Enviado');
          }
        }}
      >
        <Formik
          initialValues={{
            firstName: User ? User?.given_name : '',
            lastName: User ? User?.family_name : '',
            password: '',
            email: User ? User?.email : '',
            userName: '',
          }}
          validate={(values) => {
            let errores = {};
            if (!values.email && !User) {
              errores.email = 'Please enter your email';
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.email
              ) &&
              !User
            ) {
              errores.email = 'e.g.: exaemail@leafme.com';
            }
            if (!values.firstName && !User) {
              errores.firstName = 'Please enter your name';
            } else if (
              !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.firstName) &&
              !User
            ) {
              errores.firstName =
                'The name can only contain letters and spaces';
            }
            if (!values.lastName && !User) {
              errores.lastName = 'Please enter your last name';
            } else if (
              !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastName) &&
              !User
            ) {
              errores.lastName =
                'The last name can only contain letters and spaces';
            }
            if (!values.userName) {
              errores.userName = 'Please create an user name';
            }
            if (!values.password) {
              errores.password = 'Please create a password';
            } else if (values.password.length < 6) {
              errores.password = 'Password must be longer than 6 characters';
            }
            return errores;
          }}
          onSubmit={(values, actions) => {
            const emailFilter = allUsers.filter(
              (user) => values.email === user.email
            );
            if (emailFilter[0]) return alert('This email is already in use');

            const usernameFilter = allUsers.filter(
              (user) => values.userName === user.userName
            );
            if (usernameFilter[0]) return alert('This username already exist');
            if (User) {
              const googleUser = {
                firstName: User?.given_name,
                lastName: User?.family_name,
                email: User?.email,
                password: values.password,
                userName: values.userName,
              };
              dispatch(createUser(googleUser), []);
              localStorage.setItem('user', JSON.stringify(googleUser));
              navigate(`/home`);
              console.log('Formulario Enviado');
            } else {
              dispatch(createUser(values), []);
              localStorage.setItem('user', JSON.stringify(values));
              navigate(`/home`);
              console.log('Formulario Enviado');
            }
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Flex
              flexDir={'column'}
              w={'500px'}
              h={'100%'}
              p={5}
              backgroundColor={'white'}
            >
              <Box w="400px" ml={'30px'} position={'absolute'} top={'25%'}>
                <Box
                  height={'10vh'}
                  width={'3vw'}
                  display={'inline-block'}
                  position={'absolute'}
                  top={'71.5%'}
                  left={'54%'}
                  textAlign={'center'}
                  mb={'2vh'}
                >
                  <div
                    style={{ position: 'relative', top: '0%', left: '30%' }}
                    id="signInDiv"
                  ></div>
                </Box>
                <Form>
                  <FormControl>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={User ? User?.email : values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <Text color="red.300" size="xxs">
                        {errors.email}
                      </Text>
                    )}
                  </FormControl>

                  <FormLabel htmlFor="firstName">First name</FormLabel>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={User ? User?.given_name : values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.firstName && errors.firstName && (
                    <Text color="red.300" size="xs">
                      {errors.firstName}
                    </Text>
                  )}

                  <FormControl>
                    <FormLabel htmlFor="lastName">Last name</FormLabel>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={User ? User?.family_name : values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.lastName && errors.lastName && (
                      <Text color="red.300" size="xs">
                        {errors.lastName}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="userName">User name</FormLabel>
                    <Input
                      type="text"
                      id="userName"
                      name="userName"
                      placeholder="User Name"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.userName && errors.userName && (
                      <Text color="red.300" size="xs">
                        {errors.userName}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                      <Input
                        pr="70px"
                        type={show ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <InputRightElement width="70px">
                        <Button h="30px" size="sm" onClick={handleClick}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {touched.password && errors.password && (
                      <Text color="red.300" size="xs">
                        {errors.password}
                      </Text>
                    )}
                  </FormControl>
                  <Button type="submit" mt="10px" onSubmit={handleSubmit}>
                    Create Account
                  </Button>

                  <Link to="/">
                    <Button mt="10px" ml={'0.5vw'}>
                      Back
                    </Button>
                  </Link>
                  <hr
                    style={{
                      width: '60%',
                      marginLeft: '20%',
                      marginTop: '2vh',
                    }}
                  />
                  <Center display={'flex'} flexDir={'column'} mt={'2vh'}>
                    <p>Already have an account?</p>
                    <Button
                      mt="10px"
                      onClick={(e) => {
                        handleClickLog(e);
                      }}
                    >
                      Log In
                    </Button>
                  </Center>
                </Form>
              </Box>
            </Flex>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default CreateUser;
