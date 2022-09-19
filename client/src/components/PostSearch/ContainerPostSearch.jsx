import React, { useState } from "react";
import { Box, Wrap, Text, WrapItem, Stack, Button, Center, HStack } from "@chakra-ui/react";
import PostSearch from './PostSearch'
import { useSelector } from "react-redux";

const PostSearchContainer = () => {

    const users = useSelector((state) => state.users)
    const word = useSelector((state) => state.searchPost)

    const posteosUser = users?.map(user => {
        return (
            {
                fullName: user.fullName,
                image: user.image,
                posteos: user.posteos.map(posteo => posteo.description)
            }
        )
    })

    const filtered = posteosUser.map(user => {
        if (user.posteos.some(post => post.includes(word))) {
            return ({
                fullName: user.fullName,
                image: user.image,
                post: user.posteos.find(post => post.includes(word))

            })
        }
    })

    //--------- Lógica de paginado --------
    const [currentStart, setCurrentStart] = useState(0)
    const [currentEnd, setCurrentEnd] = useState(8)
    const [button1, setButton1] = useState(true)
    const [button2, setButton2] = useState(false)
    const first8 = filtered.length > 8 ? filtered?.slice(currentStart, currentEnd) : filtered


    const handleClickFoward = () => {

        if (currentStart >= 0) setButton1(false)

        setCurrentStart(currentStart + 8)
        setCurrentEnd(currentEnd + 8)
    }

    const handleClickBackward = () => {

        if (currentStart <= 1) setButton1(true)
        setCurrentStart(currentStart - 8)
        setCurrentEnd(currentEnd - 8)
    }
    //--------------------------------------
    //console.log(first8)
    // console.log(filtered)



    return (
        <>
            <Wrap justify={'center'} spacing={30} w='980px' borderRadius='7px' p={8} m={3} backgroundColor={"gray.300"}>
                {
                    word.length
                        ? first8.map(user => {
                            if (user?.fullName && user?.post) {
                                return (

                                    <PostSearch
                                        fullName={user?.fullName}
                                        image={user?.image}
                                        posteos={user?.post} />

                                )
                            }
                        })
                        : <Box><Text>No hay posteos</Text> </Box>
                }
                <HStack>
                    {
                        filtered.length > 8 && word.length ? <Button disabled={button1} onClick={() => handleClickBackward()} h='50px' mr="50" w={0} fontSize='sm'>⪡</Button> : null
                    }
                    {
                        filtered.length > 8 && word.length ? <Button disabled={button2} onClick={() => handleClickFoward()} h='50px' w={0} fontSize='sm'>⪢</Button> : null
                    }
                </HStack>
            </Wrap>
        </>
    )
}

export default PostSearchContainer