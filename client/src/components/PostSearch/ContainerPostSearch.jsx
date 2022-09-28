import React, { useState } from "react";
import { Box, Wrap, Text, Button, HStack } from "@chakra-ui/react";
import PostSearch from './PostSearch'
import { useSelector } from "react-redux";
import TextPostContainer from "../TextPost/TextPostContainer";
import ImgPostContainer from "../ImgPost/ImgPostContainer";

const PostSearchContainer = ({state}) => {

    const allPosts = useSelector((state) => state.posts )
    const word = useSelector((state) => state.searchPost)

    const filterPost = allPosts?.filter(post => {
        return post.description.includes(word)})
 
    const changeState = () => {
        if(state === 'images') return filterPost
        if(state === 'text') return filterPost
    }

    return (
        <>
            <Wrap justify={'center'} spacing={30} w='980px' borderRadius='7px' p={8} m={3} backgroundColor={"gray.300"}>
                {
                    state === 'text' ? (
                                <TextPostContainer
                                    posts={changeState()}
                                    site={'search'}
                                />      
                    ):(
                                <ImgPostContainer
                                    posts={changeState()}
                                    site={'search'}
                                />
                    )
                }
  
            </Wrap>
        </>
    )
}

export default PostSearchContainer