/* global google */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Tooltip,
  Center,
  Box,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, logOut } from '../../redux/actions';
import imgBackground from '../../assets/landing-pic.jpg';
import logo from '../../assets/logo.jpg';
import jwt_decode from 'jwt-decode';

const imagenB = imgBackground;
const logoLeafme = logo;

const CreateUser = () => {
  const google = (window.google = window.google ? window.google : {});
  const [show, setShow] = React.useState(false);
  const [input, setInput] = React.useState({
    email: '',
    pass: '',
  });
  const auth = useSelector((state) => state.auth);
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowClick = () => setShow(!show);
  const handleInputChange = (event) =>
    setInput({ ...input, [event.target.name]: event.target.value });
  const isError = input === ''; //true or false

  const handleCallbackResponse = (response) => {
    console.log('Encoded JWT ID token:' + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject.email);
    dispatch(authUser(userObject.email, null, true));
  };

  useEffect(() => {
    setTimeout(function () {
      google?.accounts.id.initialize({
        client_id:
          '239100653667-9cg4th0msle8b1fsvkgn7mbnae69msom.apps.googleusercontent.com',
        callback: handleCallbackResponse,
      });
      google?.accounts.id.renderButton(document.getElementById('signInDiv'), {
        theme: 'outline',
        size: 'large',
      });
    });

    isUserValidate();
  }, [auth, google]);
  //console.log(process.env.GOOGLE_ID_CLIENT);
  const handleSubmit = (input) => {
    dispatch(authUser(input.email, input.pass));
  };

  const isUserValidate = () => {
    if (auth.auth === true) {
      localStorage.setItem('user', JSON.stringify(auth.user));
      navigate(`/profile`);
    } else if (auth.reason) {
      alert(auth.reason);
    }
  };

  return (
    <>
      <Box
        h={'760px'}
        backgroundImage={imagenB}
        display={'flex'}
        justifyContent={'end'}
      >
        <Formik>
          <Flex flexDir={'column'} w={'500px'} p={5} backgroundColor={'white'}>
            <Image
              alignSelf={'center'}
              boxSize={300}
              objectFit={'contain'}
              src={logoLeafme}
              alt="logo"
            />
            <Box ml={'9vw'} mb={'3vh'} display={'flex'} id="signInDiv"></Box>
            <Box w="400px" ml={'30px'}>
              <FormControl isInvalid={isError}>
                <FormLabel>Email address or Username </FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </FormControl>
              <FormControl isInvalid={isError}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="pass"
                    value={input.pass}
                    pr="70px"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <InputRightElement width="70px">
                    <Button h="30px" size="sm" onClick={handleShowClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {auth.reason && (
                  <Text color="red.300" size="xxs">
                    {auth.reason}
                  </Text>
                )}
              </FormControl>
              {!isError ? (
                <Button
                  onClick={(e) => {
                    handleSubmit(input);
                  }}
                  mt="10px"
                >
                  Log In
                </Button>
              ) : (
                <Tooltip
                  label="Please complete required information"
                  shouldWrapChildren
                >
                  <Button isDisabled mt="10px">
                    Log In
                  </Button>
                </Tooltip>
              )}
            </Box>
            <Center display={'flex'} flexDir={'column'}>
              <p>Don't have an account?</p>
              <Link to="/sign-in">
                <Button mt="10px">Sign In</Button>
              </Link>
            </Center>
          </Flex>
        </Formik>
      </Box>
    </>
  );
};

export default CreateUser;
