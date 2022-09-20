import React from 'react'
import PostSearch from '../components/PostSearch/PostSearch'
import Navbar from '../components/navbar/Navbar';
import CreatePost from '../components/CreatePost/CreatePost';
import { HStack, VStack, Wrap, Box, Text, Button } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUsers } from '../redux/actions';
import FriendsContainer from '../components/Friends/FriendsContainer';
import UserCard from '../components/UserCard/UserCard';


const Feed = () => {

    const dispatch = useDispatch()

    const users = useSelector((state) => state.users)
    const allUsers = useSelector((state) => state.users)

    const posteosUser = users?.map(user => {
        return (
            {
                fullName: user.fullName,
                image: user.image,
                posteos: user.posteos.map(posteo => posteo.description)
            }
        )
    })

    const post = posteosUser.map(user => {
        if (user.posteos.some(post => post.includes(' '))) {
            return ({
                fullName: user.fullName,
                image: user.image,
                post: user.posteos.find(post => post.includes(' '))

            })
        }
    })

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])


    //--------- Lógica de ver mas --------
    const [currentStart, setCurrentStart] = useState(0)
    const [currentEnd, setCurrentEnd] = useState(8)
    // const [button1, setButton1] = useState(true)
    // const [button2, setButton2] = useState(false)


    const renderPosts = post.length > 8 ? post?.slice(currentStart, currentEnd) : post


    const handleClickMore = () => {

        // setCurrentStart(currentStart + 8)
        setCurrentEnd(currentEnd + 8)
    }
    //--------------------------------------

    //--------- Lógica socket --------
    const [socket, setSocket] = useState(null)
    const [user,setUser] = useState("")

    useEffect(()=>{
        setSocket(io("aca iria el localhost o LA ACTION DE REDUX"))
    },[])
    //--------------------------------




    return (
        <>
            <Navbar 
            socket={socket} 
            />
            <Box display={'flex'} dir={'row'} >
                <Box m={3}>
                    <CreatePost
                    socket={socket}
                    user ={user}
                    />
                    <Wrap justify={'center'} spacing={30} w='980px' borderRadius='7px' p={8} m={3} backgroundColor={"gray.300"}>
                        {/* <Box mr="300"><Button >Ver más</Button></Box> */}
                        {
                            post
                                ? renderPosts.map(user => {
                                    if (user?.fullName && user?.post) {
                                        return (
                                            <PostSearch
                                                fullName={user?.fullName}
                                                image={user?.image}
                                                posteos={user?.post} />
                                        )
                                    }
                                })
                                : <Box><Text>no hay posteos</Text> </Box>
                        }
                        <HStack>
                            <Button onClick={() => handleClickMore()} h='50px' w="200px" mr="50" fontSize='sm'>Ver más</Button>
                        </HStack>
                    </Wrap>
                </Box>
                <Box>
                    <UserCard />
                    {allUsers.length > 1 ?
                        <FriendsContainer
                            allUsers={allUsers}
                        /> : null}
                </Box>
            </Box>

        </>
    )
}

export default Feed


{/* <div className={container}>
                        {currentPokemons && currentPokemons.map((e) => {
                            return (
                                <Card
                                    name={e.name}
                                    img={e.img}
                                    id={e.id}
                                    types={e.types}
                                />
                            )
                        })
                        }
                    </div> */}