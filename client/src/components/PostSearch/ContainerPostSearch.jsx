import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import PostSearch from './PostSearch'

const PostSearchContainer = () => {

    // const users = useState(state=>state.users)
    // const word = useState(state=>state.searchPost)

    // const posteosUser = users?.map( user =>{
    //     return(  
    //         {
    //             fullname: user.fullName,
    //             image: user.image,
    //             posteos: user.posteo.map(posteo => posteo.description)
    //         }
    //     )})
    //     const filtered = posteosUser.map( user => {
        
    //         user.posteos.some(post => post.includes(word))
    //     })

    
    return(
        <>
        <Box  w='980px' borderRadius='7px' display='flex' justifyContent='space-between' p={3} m={3} backgroundColor={"gray.300"}>
        {/* {
            users
            ? filtered.map( user => {
                return(
                    <PostSearch
                    fullName={user.fullName}
                    image={user.image}
                    posteo={ user.posteos.map(posteo => posteo.includes(word))}/>
                )
            })
            : <Box> no hay posteos</Box>
        }             */}
        </Box>
        </>
    )
}

export default PostSearchContainer