import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { deleteAccountUser } from "../../redux/action";

import EditableForm from "./EditableForm";
import emailjs from '@emailjs/browser';

function randomNumber(min, max) {
  let a = Math.random() * (max - min) + min;
  return Math.floor(a);
}
export const ColorBox = () => {
  return(
    <Box 
      bg={`logo.${randomNumber(1, 4)}`} 
      w={10} 
      h={'9vh'}></Box>
  )
}

export const UserSettings = ({myUser, input, setInput, users}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {firstName, lastName, userName, password, email} = myUser
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled ] = useState(true)

  const usernames = users.map(user => user.userName)


  const  deleteAccount = async ()=>{
    dispatch(deleteAccountUser(myUser._id))
    const templateParams = {
      name: myUser.firstName,
      lastName: myUser.lastName,
      email: myUser.email,
      greetings:'You are deleting your account 🍁🍁🍁:',
      body:`You can still restore it from this link : https://finalprojectteam.herokuapp.com/users/restoreUser/${myUser._id}`
  };
    await emailjs.send("service_95rwpyl","welcomeTemplate", templateParams, "bKbMpxxr6e29fyR-9" )

    setTimeout(function () {
      navigate('/landing-page');
    }, 2000);
  }
  
  
  if(Object.entries(myUser).length){
        return(
          <>
          <Flex 
          flexDir="column"  
          ml={'2%'} 
          mt={'2%'}
          justify={'center'} 
          w={'50vh'}>
              <Flex 
              borderRadius={2} 
              align={'center'}>
                  <Flex   
                  m={'2% 0% 2% 2%'} 
                  p={'1% 1% 1% 2%'} 
                  align={'center'} 
                  justify={'space-between'}
                  h={'9vh'} 
                  w={'100%'} 
                  bg={'white'} >
                    <Text>First Name:</Text>
                    <EditableForm 
                    val={firstName} 
                    name={'firstName'} 
                    email={email} 
                    input={input} 
                    setInput={setInput}
                    />
                  </Flex>
                  <ColorBox/>
              </Flex>
              <Flex 
              borderRadius={2} 
              align={'center'}>
                  <Flex
                  h={'9vh'}    
                  m={'2% 0% 2% 2%'}  
                  p={'1% 1% 1% 2%'} 
                  align={'center'} 
                  justify={'space-between'} 
                  w={'100%'} 
                  bg={'white'}
                   >
                    <Text>Last Name:</Text>
                    <EditableForm 
                    val={lastName} 
                    name={'lastName'}
                    email={email}  
                    input={input} 
                    setInput={setInput}
                    />
                  </Flex>
                  <ColorBox/>
                </Flex>
                <Flex 
                borderRadius={2} 
                align={'center'}>
                    <Flex
                    h={'9vh'}    
                     m={'2% 0% 2% 2%'}  
                    p={'1% 1% 1% 2%'} 
                    align={'center'} 
                    justify={'space-between'} 
                    w={'100%'} 
                    bg={'white'} 
                    >
                    <Text>Username:</Text>
                    <EditableForm
                    email={email}  
                    val={userName} 
                    input={input}
                    name={'userName'} 
                    setInput={setInput}
                    usernames={usernames}/>
                    </Flex>
                    <ColorBox/>
                </Flex>
                <Flex 
                borderRadius={2} 
                align={'center'}>
                    <Flex
                    h={'9vh'}   
                    m={'2% 0% 2% 2%'} 
                    p={'1% 1% 1% 2%'} 
                    align={'center'} 
                    justify={'space-between'} 
                    w={'100%'} 
                    bg={'white'} 
                    >
                    <Text>Password:</Text>
                    <EditableForm 
                    val={password} 
                    input={input}
                    email={email}  
                    setInput={setInput}
                    name={'password'}
                    />
                    </Flex>
                    <ColorBox/>
                </Flex>
                <Flex 
                borderRadius={2} 
                align={'center'}>
                    <Flex   
                    m={'2% 0% 2% 2%'}  
                    align={'center'} 
                    justify={'space-between'} 
                    w={'100%'} 
                    bg={'white'} >
                          <Button
                          rightIcon={<AiOutlineDelete/>} 
                          w={'100%'}
                          h={'7vh'} 
                          bg={'none'}
                          fontStyle={'none'}
                          fontWeight={'normal'}
                          borderRadius={2}
                          onClick={deleteAccount}
                          _hover={{
                            color: 'white',
                            bg: 'logo.3' 
                          }}>Delete account?</Button>
                </Flex>
                <Box bg={`logo.3`} w={10} h={'7vh'}></Box>
                </Flex>
                </Flex>
            </>
        )
    }else return(
            <>
            <p>Loading...</p>
            </>
        )}

    // const validate = (input) => {
    //   let errores = {};
    //           if (input.firstName){
    //             if(input.firstName === '' ) {
    //             errores.firstName = 'Please enter your name';
    //             } else if ( !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.firstName)) {
    //             errores.firstName = 'The name can only contain letters and spaces';
    //           }}
    //           if (input.lastName){
    //           if (input.lastName === '') {
    //             errores.lastName = 'Please enter your last name';
    //           } else if (
    //             !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.lastName)) {
    //             errores.lastName = 'The last name can only contain letters and spaces';
    //           }}
    //           if(input.userName){
    //           if (input.userName === '') {
    //             errores.userName = 'Please create an username';
    //           } else if (usernames?.includes(input.userName)) {
      //             errores.userName = 'Username in use, please create another one';
    //           }}
    //           if(input.password){
      //           if (input.password === '') {
    //             errores.password = 'Please create a password';
    //           } else if (input.password.length < 6) {
    //             errores.password = 'Password must be longer than 6 characters';
    //           }}
    //           return errores;
              
    //         }
    // const handleSubmit = () => {
    //           dispatch(changeDataProfile(input))
    //         }
    {/* {
      Object.entries(input).length ? (
        <Button
        rightIcon={<RiCheckboxLine/>} 
        w={'100%'}
        h={'7vh'} 
        bg={'none'}
        fontStyle={'none'}
        fontWeight={'normal'}
        borderRadius={2}
        _hover={{
          color: 'white',
          bg: 'logo.3' 
        }}>Confirm changes?</Button>
      ):( */}