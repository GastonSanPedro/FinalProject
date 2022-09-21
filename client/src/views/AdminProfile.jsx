import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../components/CreatePost/CreatePost';
import FriendsContainer from '../components/Friends/FriendsContainer';
import Navbar from '../components/navbar/Navbar';
import ProfileDetail from '../components/ProfileDetail/ProfileDetail';
import UserCard from '../components/UserCard/UserCard';
import UserPost from '../components/UserPosts/UserPost';
import { Button, Flex, Avatar, Wrap, Badge, Box, Text } from '@chakra-ui/react';

import '../index.css';
import { getMyUser, getPosts, getUsers } from '../redux/actions';

const AdminProfile = () => {
    const [User, setUser] = useState(
        useState(JSON.parse(localStorage.getItem('user')))
    );
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.users);
    const user = useSelector((state) => state.myUser);
    const posts = useSelector((state) => state.posts);
    const neededEmail = User[0].email;
    console.log(neededEmail);
    // const logUser = JSON.parse(localStorage.getItem('user'));
    // const loggedUser = JSON.parse(logUser.User);
    // console.log(loggedUser);
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getMyUser(neededEmail));
        dispatch(getPosts(neededEmail));
    }, [dispatch, neededEmail]);

    const changeHandler = (email) => {
        dispatch(getMyUser(email));
    };


    return (
        <>
            <Navbar></Navbar>

            <Box display="flex" dir="row">
                <Box m={3} width={'78%'} position={'absolute'} left={'5%'}>

                    {/* 
                    <Button mt="10">Usuarios</Button>
                    <Button mt="10">Usuarios Premium</Button> */}


                </Box>


                <Box boxShadow='xl' h="180px" w="280px" rounded='md' bg='#ffc8dd'>
                    <Flex>

                        <Avatar src='https://bit.ly/sage-adebayo' />
                        <Box ml='3'>
                            <Text fontWeight='bold'>
                                Segun Adebayo
                                <Badge ml='1' colorScheme='green'>
                                    New
                                </Badge>
                            </Text>
                            <Text fontSize='sm'>UI Engineer</Text>
                        </Box>
                    </Flex>

                </Box>




                <Box position={'absolute'} right={'3%'}>
                    <UserCard />
                    {allUsers.length > 1 ? (
                        <FriendsContainer allUsers={allUsers} />
                    ) : null}
                </Box>
            </Box>
        </>
    );
};

export default AdminProfile;
