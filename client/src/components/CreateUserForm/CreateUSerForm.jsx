import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cleanAuthUser, createUser, getUsers } from '../../redux/action';
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
  Image,
  useToast,
} from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.jpg';
import imgBackground from '../../assets/landing-pic.jpg';

const logoLeafme = logo;
const imagenB = imgBackground;

const CreateUser = ({ logOrSign, setlogOrSign }) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const toast = useToast();
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
  const handleClickLog = (event) => {
    dispatch(cleanAuthUser());
    setlogOrSign('log');
  };
  const handleNavigation = () => {
    setTimeout(function () {
      navigate(`/home`);
    }, 2000);
  };
  useEffect(() => {
    /* global google */
    dispatch(getUsers());
    if (auth.auth === 'unregistered') {
      setUser(auth.user);
    }
  }, [dispatch]);

  console.log(User);
  const valEmail = (inputValueEmail) => {
    const emailF = allUsers.filter((user) => inputValueEmail === user.email);
    if (emailF[0]) return true;
    else return false;
  };
  const valUsername = (inputValueUsername) => {
    const usernameF = allUsers.filter(
      (user) => inputValueUsername === user.userName
    );
    if (usernameF[0]) return true;
    else return false;
  };

  return (
    <>
      <Box
        h={'760px'}
        backgroundImage={imagenB}
        display={'flex'}
        justifyContent={'end'}
      >
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
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
            } else if (valEmail(values.email)) {
              errores.email = 'Email in use';
            } else if (values.email.includes('+')) {
              errores.email = 'Email can not contain +';
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
            } else if (valUsername(values.userName)) {
              errores.userName = 'Username in use, please create another one';
            }
            if (!values.password) {
              errores.password = 'Please create a password';
            } else if (values.password.length < 6) {
              errores.password = 'Password must be longer than 6 characters';
            }

            return errores;
          }}
          onSubmit={(values, actions) => {
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
              toast({
                title: 'Welcome',
                description:
                  'Your account has been created sucesfully.Redirecting to your feed',
                status: 'success',
                duration: 2000,
                isClosable: true,
                onCloseComplete: handleNavigation(),
              });
              //navigate(`/home`);
            } else {
              dispatch(createUser(values), []);

              localStorage.setItem('user', JSON.stringify(values));
              toast({
                title: 'Welcome!',
                description:
                  'Your account has been created sucesfully.Redirecting to your feed',
                status: 'success',
                duration: 2000,
                isClosable: true,
                onCloseComplete: handleNavigation(),
              });
              //navigate(`/home`);
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
              position={'absolute'}
              top={'0%'}
              right={'0%'}
              w={'500px'}
              h={'100%'}
              p={5}
              backgroundColor={'white'}
            >
              <Image
                alignSelf={'center'}
                boxSize={300}
                objectFit={'contain'}
                position={'absolute'}
                right={'20%'}
                top={'-5%'}
                src={logoLeafme}
                alt="logo"
              />
              <Box w="400px" ml={'30px'} position={'absolute'} top={'27%'}>
                <Box
                  height={'10vh'}
                  width={'3vw'}
                  display={'inline-block'}
                  position={'absolute'}
                  top={'71.5%'}
                  left={'54%'}
                  textAlign={'center'}
                  mb={'2vh'}
                ></Box>
                <Form>
                  <FormControl>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
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
                    value={values.firstName}
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
                      value={values.lastName}
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
                  {Object.entries(errors).length ? (
                    <Button
                      disabled={true}
                      type="submit"
                      mt="10px"
                      onSubmit={handleSubmit}
                    >
                      Create Account
                    </Button>
                  ) : (
                    <Button
                      disabled={false}
                      type="submit"
                      mt="10px"
                      onSubmit={handleSubmit}
                    >
                      Create Account
                    </Button>
                  )}

                  <Link to="/">
                    <Button
                      mt="10px"
                      ml={'0.5vw'}
                      onClick={(e) => {
                        dispatch(cleanAuthUser());
                        setUser('');
                        setlogOrSign('log');
                      }}
                    >
                      Back
                    </Button>
                  </Link>
                  <Button
                    mt="10px"
                    ml={'0.5vw'}
                    onClick={(e) => {
                      dispatch(cleanAuthUser());
                      setUser('');
                    }}
                  >
                    Clean
                  </Button>
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
