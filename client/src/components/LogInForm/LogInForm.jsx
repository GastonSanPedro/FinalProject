/* global google */
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import jwt_decode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import imgBackground from '../../assets/landing-pic.jpg';
import logo from '../../assets/logo.jpg';
import { authUser, getFollowers, getFriends } from '../../redux/action';

const imagenB = imgBackground;
const logoLeafme = logo;

const LogInForm = ({ logOrsign, setlogOrSign }) => {
  const google = (window.google = window.google ? window.google : {});
  const [show, setShow] = React.useState(false);
  const [input, setInput] = React.useState({
    email: '',
    pass: '',
  });
  const toast = useToast();
  const auth = useSelector((state) => state.auth);
  // const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowClick = () => setShow(!show);
  const handleInputChange = (event) =>
    setInput({ ...input, [event.target.name]: event.target.value });
  const isError = input === ''; //true or false

  const handleCallbackResponse = (response) => {
    console.log('Encoded JWT ID token:' + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    dispatch(
      authUser(userObject.email, null, {
        email: userObject.email,
        given_name: userObject.given_name,
        family_name: userObject.family_name,
      })
    );
  };

  useEffect(() => {
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

    isUserValidate();
  }, [auth, google]);
  //console.log(process.env.GOOGLE_ID_CLIENT);
  const handleSubmit = (input) => {
    dispatch(authUser(input.email, input.pass));
  };
  const handleClick = (event) => {
    setlogOrSign('sign');
  };

  const handleNavigation = () => {
    setTimeout(function () {
      navigate(`/home`);
    }, 2000);
  };
  const isUserValidate = () => {
    if (auth.auth === true) {
      localStorage.setItem('user', JSON.stringify(auth.user));
      localStorage.setItem('email', JSON.stringify(auth.user.email));
      toast({
        title: 'Sucess',
        description: 'Redirecting to your feed',
        status: 'success',
        duration: 2000,
        isClosable: true,
        onCloseComplete: handleNavigation(),
      });
      // dispatch(getFollowers(auth.user._id));
      // dispatch(getFriends(auth.user._id));
      //navigate(`/Home`);
    } else if (auth.reason) {
      //alert(auth.reason);
      toast({
        title: 'Error',
        description: auth.reason,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else if (auth.auth === 'unregistered') {
      toast({
        title: 'Account not created yet',
        description: 'Complete your password and username to proceed',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
      setlogOrSign('sign');
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
          <Flex
            flexDir={'column'}
            w={'500px'}
            h={'100%'}
            p={5}
            backgroundColor={'white'}
          >
            <Box w="400px" ml={'30px'} position={'absolute'} top={'40%'}>
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
            <Box
              height={'10vh'}
              width={'8vw'}
              display={'inline-block'}
              position={'relative'}
              top={'70%'}
              left={'37%'}
              textAlign={'center'}
              mb={'2vh'}
            >
              <Text mb={'1vh'}>Access with</Text>
              <div
                style={{ position: 'relative', top: '0%', left: '30%' }}
                id="signInDiv"
              ></div>
            </Box>
            <hr
              style={{
                width: '60%',
                marginLeft: '20%',
                position: 'relative',
                top: '70%',
              }}
            />
            <Center
              display={'flex'}
              flexDir={'column'}
              mt={'2vh'}
              position={'relative'}
              top={'70%'}
            >
              <p>Don't have an account?</p>
              <Button
                onClick={(e) => {
                  handleClick(e);
                }}
                mt="10px"
              >
                Sign In
              </Button>
            </Center>
          </Flex>
        </Formik>
      </Box>
    </>
  );
};

export default LogInForm;
