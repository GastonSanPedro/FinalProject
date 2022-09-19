import {
  AlertTitle,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authUser, getUser, logOut } from '../../redux/actions';

const LogInForm = () => {
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

  useEffect(() => {
    isUserValidate();
  }, [auth]);

  const handleSubmit = (input) => {
    dispatch(authUser(input.email, input.pass));
  };

  const isUserValidate = () => {
    if (auth.auth === true) {
      localStorage.setItem('user', JSON.stringify(auth.user));
      navigate(`/profile`);
    }
    // } else if (auth.reason) {
    //   //alert(auth.reason);
    //   //ESTO LO TENGO QUE CAMBIAR, HABRIA QUE VER QUE ESE MENSAJE SE RENDERIZE EN ERRORES
    // }
  };

  return (
    <>
      <Formik>
        <Center>
          <Box w="400px" m="60px">
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
        </Center>
      </Formik>
    </>
  );
};

export default LogInForm;
