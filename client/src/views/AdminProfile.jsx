import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import { Flex, Avatar, Badge, Box, Text } from '@chakra-ui/react';
import '../index.css';
import { getMyUser, getPosts, getUsers } from '../redux/action';
import { Box, Heading, HStack, VStack, Text, Center, StatGroup, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
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



        <Box pos="absolute" mt="8%" ml="20%" bg={'rgba(229, 191, 124, 0.2)'} h="auto" w='75%'>
            <Box>
                <HStack>
                    <UserStats />
                    <Box pt="0px" mt="0px">
                        <Center pt="0px" mt="0px" >
                            <VStack ml="200px" >
                                <Heading pt="0px" mt="0px" >Premium post stats</Heading>
                                <Box>
                                    <Text >Plan de 3 días</Text>
                                    <Text>Plan de 1 semana</Text>
                                    <Text>Plan de 1 mes</Text>
                                </Box>
                            </VStack>
                        </Center>
                    </Box>
                </HStack>
            </Box>
        </Box>



        <Box pos="absolute" mt="30%" ml="20%" bg={'rgba(229, 191, 124, 0.2)'} h="auto" w='75%'> 
            <StatGroup>
                <Stat>
                    <StatLabel>New Users</StatLabel>
                    <StatNumber>28</StatNumber>
                    <StatHelpText>
                        <StatArrow type='increase' />
                        32%
                    </StatHelpText>
                </Stat>
                <Stat>
                        <StatLabel>Coments </StatLabel>
                        <StatNumber>875</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase' />
                            120.58%
                        </StatHelpText>
                </Stat>
                <Stat>
                        <StatLabel>Likes</StatLabel>
                        <StatNumber>2687</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase' />
                            26.8%
                        </StatHelpText>
                </Stat>
            </StatGroup>

        </Box>
        </> 
    );
};

export default AdminProfile;
