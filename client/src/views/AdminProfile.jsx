import {
    Box,
    Heading,
    HStack,
    VStack,
    Text,
    Center,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
} from '@chakra-ui/react';
import '../index.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, deletePost } from '../redux/action';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import UserStats from '../components/Stats/UsersStats';
import ContainerPost from '../components/ContainerPost/ContainerPost';

const AdminProfile = () => {

    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts);
    const myUser = useSelector((state) => state.myUser);

    useEffect(() => {
        dispatch(getPosts());
    }, [posts]);

    const handleDelete = (id) => {
        dispatch(deletePost(id))
    }

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
            <Box pos="absolute" mt="40%" ml="20%" bg={'rgba(229, 191, 124, 0.2)'} h="auto" w='75%'>
                <Accordion defaultIndex={[1]} allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    Posteos reportados
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

                </Accordion>
            </Box>
        </>
    );
};

export default AdminProfile;
