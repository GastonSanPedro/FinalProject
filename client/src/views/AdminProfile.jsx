import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import '../index.css';
import { getMyUser, getPosts, getUsers } from '../redux/action';
import { Box,Heading, HStack, VStack, Text } from '@chakra-ui/react';
import UserStats from '../components/Stats/UsersStats';

const AdminProfile = () => {

    const [User, setUser] = useState(
        useState(JSON.parse(localStorage.getItem('user')))
    );
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.users);
    const user = useSelector((state) => state.myUser);
    const posts = useSelector((state) => state.posts);
    const neededEmail = User[0].email;

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
            <SidebarWithHeader />
            <Box
                pos="absolute"
                mt="8%"
                //mt="200px"
                //ml="400px" "10%"
                ml="20%"
                bg={'rgba(229, 191, 124, 0.2)'}
                h="auto"
                w='75%'
            >
                <Heading>Plans</Heading>
                <HStack>
                    {/* <VStack>
                    <HStack>
                         <Text>Plan 1</Text> 
                         <Box bgColor='#4dc9f6' w="40px" h="10px"></Box>
                    </HStack>
                    <HStack>
                         <Text>Plan 2</Text> 
                         <Box bgColor='#f67019' w="40px" h="10px"></Box>
                    </HStack>
                    <HStack>
                         <Text>Plan 3</Text> 
                         <Box bgColor='#f53794' w="40px" h="10px"></Box>
                    </HStack>
                    
                        
                    </VStack> */}
                    <UserStats />
                </HStack>
            </Box>
        </>
    );
};

export default AdminProfile;
