import React from 'react'
import UserSinglePost from '../components/UserSinglePost/UserSinglePost'
import Navbar from '../components/navbar/Navbar';
import CreatePost from '../components/CreatePost/CreatePost';
import { HStack } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUsers } from '../redux/actions';



const Feed = () => {

    const dispatch = useDispatch()

    const allUsers = useSelector((state) => state.users)
    const allPosts = useSelector((state) => state.posts)

    useEffect(() =>{
        dispatch(getPosts())
    },[dispatch])
    useEffect(() =>{
        dispatch(getUsers())
    },[dispatch])

    return (
        <>

            <Navbar />
            <CreatePost />
            <HStack >
                <UserSinglePost />
                <UserSinglePost />
            </HStack>
        </>
    )
}

export default Feed