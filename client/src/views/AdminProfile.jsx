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
import { getPosts, deletePost, getDeletedUsers, } from '../redux/action';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import ContainerPost from '../components/ContainerPost/ContainerPost';
import { FiUsers } from "react-icons/fi";
import { BsFilePost } from "react-icons/bs";
import { AiTwotonePlusCircle } from "react-icons/ai"
import ContainerUsersAdmin from '../components/AdminAssets/ContainerUsersAdmin';
import { useState } from 'react';
import { blockUser } from '../redux/action';
import PostStats from '../components/Stats/PostStats';
import UserStats from '../components/Stats/UsersStats';
import { restoretPost } from '../redux/action';
import { restoretUser } from '../redux/action';

const AdminProfile = () => {

    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts);
    const myUser = useSelector((state) => state.myUser);
    const friends = useSelector((state) => state.friends);
    const myFollowers = useSelector((state) => state.followers)
    const users = useSelector((state) => state.users)
    const deletedUsers = useSelector((state) => state.usersDeleted)

    const [block, setBlock] = useState('Blocked users')



    // useEffect(() => {
    //     if (deletedUsers?.length === 0) { dispatch(getDeletedUsers()) }
    // }, [dispatch])

    // useEffect(() => {
    //     if (posts?.length === 0) { dispatch(getPosts()); }
    // }, [posts])

    useEffect(() => {
        // if (deletedUsers?.length === 0) { dispatch(getDeletedUsers()) }
        dispatch(getDeletedUsers())
        if (posts?.length === 0) { dispatch(getPosts()); }
    }, [])

    const handleDelete = (id) => {
        dispatch(deletePost(id))
    }

    const handleRestore = (id) => {
        dispatch(restoretPost(id))
    }


    const HandleBlock = (userId) => {
        dispatch(blockUser(userId))
        dispatch(getDeletedUsers())
    }

    const handleRestoreUser = (userId) =>{
        dispatch(restoretUser(userId))
    }

    return (
        <>
            <SidebarWithHeader myUser={myUser} friends={friends} myFollowers={myFollowers} />
            <HStack position={"absolute"}
                top={"110px"}
                left={"20%"}
                w={"75%"}
                spacing={"30px"}>
                <Box
                    h={"230px"}
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

                    </HStack>
                    <Box h={"200px"} position={"absolute"} top={"-15%"} left={"20.5%"}>
                        <UserStats

                        />
                    </Box>
                </Box>


                <Box
                    h={"230px"}
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
                    <Box h={"200px"} position={"absolute"} top={"-15%"} right={"2%"}>
                        <PostStats />
                    </Box>
                </Box>


            </HStack>


            <Box pos="absolute" mt="25%" ml="20%" h="auto" w='75%'>



                <Accordion allowMultiple >




                    <AccordionItem bg={"gray.50"}>
                        <h2>
                            <AccordionButton>

                                <Box flex='1' textAlign='left' >
                                    Reported Posts
                                </Box>
                                {/* {posts.length > 0 ?
                                    <AiTwotonePlusCircle color='red'/> : null} */}
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <ContainerPost
                                myUser={myUser}
                                posts={posts}
                                site="admin"
                                handleDelete={handleDelete}
                                handleRestore={handleRestore}
                            />
                        </AccordionPanel>
                    </AccordionItem>




                    <AccordionItem bg={"gray.50"}>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    Block/Restore Users
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <HStack>

                                <RadioGroup onChange={setBlock} value={block}>
                                    <HStack direction="row">
                                        <Radio value='Blocked users'>Blocked users</Radio>
                                        <Radio value='All users'>Users in good standing</Radio>
                                    </HStack>
                                </RadioGroup>

                            </HStack>
                            <ContainerUsersAdmin
                                HandleBlock={HandleBlock}
                                handleRestoreUser={handleRestoreUser}
                                users={block === 'All users' ? users : deletedUsers}
                                block={block}

                            />
                        </AccordionPanel>
                    </AccordionItem>



                </Accordion>


            </Box>
        </>
    );
};

export default AdminProfile;
