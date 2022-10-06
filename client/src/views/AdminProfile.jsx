import {
    Box,
    HStack,
    VStack,
    Stat,
    StatLabel,
    StatNumber,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Icon,
    Input,
    Button,
    RadioGroup,
    Radio
} from '@chakra-ui/react';
import '../index.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, deletePost, getDeletedUsers, getUsers } from '../redux/action';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import ContainerPost from '../components/ContainerPost/ContainerPost';
import { FiUsers } from "react-icons/fi";
import { BsFilePost } from "react-icons/bs";
import ContainerUsersAdmin from '../components/AdminAssets/ContainerUsersAdmin';
import { useState } from 'react';
// import { useRadio, useRadioGroup } from '@chakra-ui/react'
// import UserStats from '../components/Stats/UsersStats';
import { blockRestoreUser } from '../redux/action';

const AdminProfile = () => {

    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts);
    const myUser = useSelector((state) => state.myUser);
    const friends = useSelector((state) => state.friends);
    const myFollowers = useSelector((state) => state.followers)
    const users = useSelector((state) => state.users)
    const deletedUsers = useSelector((state) => state.deletedUsers)

    const [block, setBlock] = useState('Blocked users')

    // useEffect(() => {
    //     if (deletedUsers?.length === 0) { dispatch(getDeletedUsers()) }
    // }, [dispatch])

    // useEffect(() => {
    //     if (posts?.length === 0) { dispatch(getPosts()); }
    // }, [posts])

    useEffect(() => {
        if (deletedUsers?.length === 0) { dispatch(getDeletedUsers()) }
        if (posts?.length === 0) { dispatch(getPosts()); }
    }, [])

    const handleDelete = (id) => {
        dispatch(deletePost(id))
    }


    const HandleBlock = (userId) => {
        dispatch(blockRestoreUser(userId))

        useEffect(() => {
        }, [users, deletedUsers])
        
    }


    return (
        <>
            <SidebarWithHeader myUser={myUser} friends={friends} myFollowers={myFollowers} />
            <VStack position={"absolute"}
                top={"100px"}
                left={"20%"}
                w={"75%"}
                spacing={"30px"}>
                <Box
                    h={"200px"}
                    w={"100%"}
                    border={"1px"}
                    borderColor={"gray.200"}
                >
                    <HStack left={"20px"} top={"20px"} position={"relative"}>
                        <Icon
                            color={`logo.2`}
                            as={FiUsers}
                            w={"70px"}
                            h={"70px"} />

                        <Stat position={"relative"} left={"10px"}>
                            <StatLabel fontSize={"4xl"}>Users</StatLabel>
                            <StatNumber>{users?.length}</StatNumber>
                        </Stat>

                        {/* <UserStats /> */}
                    </HStack>
                </Box>


                <Box
                    h={"200px"}
                    w={"100%"}
                    border={"1px"}
                    borderColor={"gray.200"}
                >
                    <HStack left={"20px"} top={"20px"} position={"relative"}>
                        <Icon
                            color={`logo.3`}
                            as={BsFilePost}
                            w={"70px"}
                            h={"70px"}
                        />

                        <Stat position={"relative"} left={"10px"}>
                            <StatLabel fontSize={"4xl"}>Posts</StatLabel>
                            <StatNumber>{posts?.length}</StatNumber>
                        </Stat>
                    </HStack>
                </Box>


            </VStack>


            {/* <Box pos="absolute" mt="8%" ml="20%" bg={'rgba(229, 191, 124, 0.2)'} h="auto" w='75%'>
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
            </Box> */}

            <Box pos="absolute" mt="38%" ml="20%" h="auto" w='75%'>



                <Accordion allowMultiple >




                    <AccordionItem bg={`logo.1`}>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left' >
                                    Reported posts
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <ContainerPost
                                myUser={myUser}
                                posts={posts}
                                site="admin"
                                handleDelete={handleDelete}
                            />
                        </AccordionPanel>
                    </AccordionItem>




                    <AccordionItem bg={`logo.1`}>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    Bloqued users
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <HStack>

                                <RadioGroup onChange={setBlock} value={block}>
                                    <HStack direction="row">
                                        <Radio value='Blocked users'>Blocked users</Radio>
                                        <Radio value='All users'>All users</Radio>
                                    </HStack>
                                </RadioGroup>

                            </HStack>
                            <ContainerUsersAdmin
                                HandleBlock={HandleBlock}
                                users={block === 'All users' ? users : deletedUsers}
                            />
                        </AccordionPanel>
                    </AccordionItem>



                </Accordion>


            </Box>
        </>
    );
};

export default AdminProfile;
