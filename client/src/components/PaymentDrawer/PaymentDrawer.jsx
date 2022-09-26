import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Flex,
  Button,
  Icon,
  Box,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/action';

export default function Friends() {
  const dispatch = useDispatch();

  const [size, setSize] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onOpen();
  };

  return (
    <>
      <Flex
        onClick={() => handleClick()}
        key={'friends'}
        role="group"
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        w={200}
        cursor="pointer"
        _hover={{
          bg: '#8ea26f',
          color: 'white',
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={FiUsers}
        />
        {'Premium'}
      </Flex>

      <Drawer onClose={onClose} isOpen={isOpen} size={'sm'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`Premium Upgrade`}</DrawerHeader>
          <DrawerBody>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                password: '',
                email: '',
                userName: '',
              }}
              validate={(values) => {
                // let errores = {};
                // if (!values.email && !User) {
                //   errores.email = 'Please enter your email';
                // } else if (
                //   !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                //     values.email
                //   ) &&
                //   !User
                // ) {
                //   errores.email = 'e.g.: exaemail@leafme.com';
                // }
                // if (!values.firstName && !User) {
                //   errores.firstName = 'Please enter your name';
                // } else if (
                //   !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.firstName) &&
                //   !User
                // ) {
                //   errores.firstName =
                //     'The name can only contain letters and spaces';
                // }
                // if (!values.lastName && !User) {
                //   errores.lastName = 'Please enter your last name';
                // } else if (
                //   !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastName) &&
                //   !User
                // ) {
                //   errores.lastName =
                //     'The last name can only contain letters and spaces';
                // }
                // if (!values.userName) {
                //   errores.userName = 'Please create an user name';
                // }
                // if (!values.password) {
                //   errores.password = 'Please create a password';
                // } else if (values.password.length < 6) {
                //   errores.password =
                //     'Password must be longer than 6 characters';
                // }
                // return errores;
              }}
              //   onSubmit={(values, actions) => {
              //     const emailFilter = allUsers.filter(
              //       (user) => values.email === user.email
              //     );
              //     if (emailFilter[0])
              //       return alert('This email is already in use');

              //     const usernameFilter = allUsers.filter(
              //       (user) => values.userName === user.userName
              //     );
              //     if (usernameFilter[0])
              //       return alert('This username already exist');
              //     if (User) {
              //       const googleUser = {
              //         firstName: User?.given_name,
              //         lastName: User?.family_name,
              //         email: User?.email,
              //         password: values.password,
              //         userName: values.userName,
              //       };
              //       dispatch(createUser(googleUser), []);
              //       localStorage.setItem('user', JSON.stringify(googleUser));
              //       navigate(`/home`);
              //       console.log('Formulario Enviado');
              //     } else {
              //       dispatch(createUser(values), []);
              //       localStorage.setItem('user', JSON.stringify(values));
              //       navigate(`/home`);
              //       console.log('Formulario Enviado');
              //     }
              //   }}
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
                  right={'0%'}
                  w={'23vw'}
                  h={'100%'}
                  mr={'7vw'}
                  backgroundColor={'white'}
                >
                  <Box w="400px" position={'absolute'} top={'0%'}>
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
                        <FormLabel htmlFor="email">Numero de tarjeta</FormLabel>
                        <Input
                          id="form-checkout__cardNumber"
                          type="cardNumber"
                          name="cardNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {/* {touched.email && errors.email && (
                          <Text color="red.300" size="xxs">
                            {errors.email}
                          </Text>
                        )} */}
                      </FormControl>

                      <FormLabel htmlFor="firstName">First name</FormLabel>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {/* {touched.firstName && errors.firstName && (
                        <Text color="red.300" size="xs">
                          {errors.firstName}
                        </Text>
                      )} */}

                      <FormControl>
                        <FormLabel htmlFor="lastName">Last name</FormLabel>
                        <Input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {/* {touched.lastName && errors.lastName && (
                          <Text color="red.300" size="xs">
                            {errors.lastName}
                          </Text>
                        )} */}
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="userName">User name</FormLabel>
                        <Input
                          type="text"
                          id="userName"
                          name="userName"
                          placeholder="User Name"
                          //   value={values.userName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {/* {touched.userName && errors.userName && (
                          <Text color="red.300" size="xs">
                            {errors.userName}
                          </Text>
                        )} */}
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                          <Input
                            pr="70px"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            // value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </InputGroup>
                        {/* {touched.password && errors.password && (
                          <Text color="red.300" size="xs">
                            {errors.password}
                          </Text>
                        )} */}
                      </FormControl>
                      <Button type="submit" mt="10px" onSubmit={handleSubmit}>
                        Send Payment
                      </Button>
                      <hr
                        style={{
                          width: '60%',
                          marginLeft: '20%',
                          marginTop: '2vh',
                        }}
                      />
                    </Form>
                  </Box>
                </Flex>
              )}
            </Formik>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
